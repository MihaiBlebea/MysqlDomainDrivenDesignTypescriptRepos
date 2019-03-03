import UserRepository from './UserRepository'
import JobRepository from './JobRepository'
import CarRepository from './CarRepository'

import { User, Job, Car } from './models'
import { UnitOfWork, MysqlConnection, Query } from './../'
import { PoolConnection, Connection } from './../'


let mysql = new MysqlConnection('127.0.0.1', 'playground_db', 'admin', 'root', 32778)

mysql.getConnection().then(async (conn : PoolConnection | Connection)=> {

    UnitOfWork.begin(conn, (async (connection : PoolConnection)=> {
        let userRepo = new UserRepository(conn)
        let jobRepo  = new JobRepository(conn)
        let carRepo  = new CarRepository(conn)


        let developer = new Job('daaa', 38000)
        let user      = new User(1, 'Mihai', 29)
        user.addCar(new Car('Mercedes', 5, 25000, 1))
        user.addCar(new Car('Clio', 3, 1500, 1))

        try {

            let users = await userRepo.findId(1)
            let cars  = await carRepo.findUserId(users[0].getId()!)
            users[0].addCars(cars)
            console.log(users[0])
            connection.commit()

        } catch(error) {
            console.log(error)
            connection.rollback()
        }
    }))

}).catch((error)=> {
    console.log(error)
})
