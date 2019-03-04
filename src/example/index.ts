import UserRepository from './UserRepository'
import JobRepository from './JobRepository'
import CarRepository from './CarRepository'

import { User, Job, Car } from './models'
import { UnitOfWork, MysqlConnectionFactory, Unit } from './../'
import { PoolConnection } from './../'


let connFactory = new MysqlConnectionFactory('127.0.0.1', 'playground_db', 'admin', 'root', 32778)


// UnitOfWork.begin(mysql, async (unit : Unit)=> {
//
//     let userRepo = new UserRepository(unit.connection)
//     let carRepo  = new CarRepository(unit.connection)
//
//     let user = new User(1, 'Mihai', 29)
//
//     user.addCar(new Car('Mercedes', 5, 25000, 1))
//     user.addCar(new Car('Clio', 3, 1500, 1))
//
//     try {
//
//         let users = await userRepo.findId(1)
//         let cars  = await carRepo.findUserId(users[0].getId()!)
//
//         users[0].addCars(cars)
//
//         console.log(users[0])
//         unit.complete()
//
//     } catch(error) {
//         unit.rollback()
//     }
//
// })

let user = new User(1, 'Mihai', 29)
connFactory.getConnection(async (conn : PoolConnection)=> {
    let userRepo = new UserRepository(conn)

    let result = await userRepo.createOne(user)
    console.log(result)
})
