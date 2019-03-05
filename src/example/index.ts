import UserRepository from './UserRepository'
import JobRepository from './JobRepository'
import CarRepository from './CarRepository'

import { User, Job, Car } from './models'
import { UnitOfWork, MysqlConnectionFactory, Unit } from './../'
import { PoolConnection } from './../'


let factory = new MysqlConnectionFactory('127.0.0.1', 'playground_db', 'admin', 'root', 32778)

const execute = async (factory : MysqlConnectionFactory)=> {
    let unit = await UnitOfWork.begin(factory)

    let userRepo = new UserRepository(unit.connection)
    let carRepo  = new CarRepository(unit.connection)
    let jobRepo  = new JobRepository(unit.connection)

    try {
        let user = new User(1, 'Mihai', 29)

        await userRepo.createOne(user)

        user.addCar(new Car('Mercedes', 5, 25000, 1))
        user.addCar(new Car('Clio', 3, 1500, 1))

        let cars  = await carRepo.createMany(user.cars)

        await jobRepo.createOne(new Job('developer', 24000))

        unit.complete()
        // console.log(savedUser)
        return user
    } catch(error) {
        console.log(error)
        unit.rollback()
    }
}

execute(factory).then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})

// let conn = factory.getConnection()
// let userRepo = new UserRepository(conn)
//
// userRepo.createOrUpdate(new User(1, 'Stefan', 40, 1)).then((result)=> {
//     console.log(result)
// }).catch((error)=> {
//     console.log(error)
// })
