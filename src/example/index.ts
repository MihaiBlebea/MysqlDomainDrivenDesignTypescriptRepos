import UserRepository from './UserRepository'
import JobRepository from './JobRepository'
import CarRepository from './CarRepository'

import { User, Job, Car } from './models'
import { MysqlConnection } from './../MysqlConnection'
import { UnitOfWork } from './../'
import { createConnection, createPool, PoolConnection, Connection } from 'mysql'

import Query from './../Query'

let mysql = new MysqlConnection('127.0.0.1', 'playground_db', 'admin', 'root', 32778)

// let userRepo = new UserRepository(mysql)
// let jobRepo  = new JobRepository(mysql)
//
// let developer = new Job('d', 38000)
// let user      = new User(1, 'Mihai', 29)


// let unitOfWork = new UnitOfWork(connection)

// const unit = async ()=> {
//     let conn = await mysql.startTransaction()
//
//     try {
//         let foo = await mysql.query(
//             `INSERT INTO users
//              (job_id, name, age)
//              VALUES (?, ?, ?)`, [1, 'Cristina', 32], conn)
//
//         let bar = await mysql.query(
//             `INSERT INTO jobs
//              (title, salary)
//              VALUES (?, ?)`, ['maaa', 25000], conn)
//
//         mysql.commitTransaction(conn)
//     } catch(error) {
//         console.log(error)
//         mysql.rollbackTransaction(conn)
//     }
// }
//
//
// unit()

mysql.getConnection().then(async (conn : PoolConnection | Connection)=> {
    // let userRepo = new UserRepository(conn)
    // let jobRepo  = new JobRepository(conn)
    //
    // let developer = new Job('d', 38000)
    // let user      = new User(1, 'Mihai', 29)
    //
    // jobRepo.createOne(developer).then((result : any)=> {
    //     console.log(result)
    // }).catch((error : Error)=> {
    //     console.log(error)
    // })
    //
    // userRepo.createOne(user).then((result : any)=> {
    //     console.log(result)
    // }).catch((error : Error)=> {
    //     console.log(error)
    // })

    let unit = new UnitOfWork(conn)
    unit.start(async (connection : PoolConnection)=> {
        let userRepo = new UserRepository(conn)
        let jobRepo  = new JobRepository(conn)
        let carRepo  = new CarRepository(conn)


        let developer = new Job('daaa', 38000)
        let user      = new User(1, 'Mihai', 29)
        user.addCar(new Car('Mercedes', 5, 25000, 1))
        user.addCar(new Car('Clio', 3, 1500, 1))

        try {
            // let jobResult  = await jobRepo.createOne(developer)
            // let userResult = await userRepo.createOne(user)
            // let carResult  = await carRepo.createMany(user.cars)

            let users = await userRepo.findId(1)
            let cars  = await carRepo.findUserId(users[0].getId()!)
            users[0].addCars(cars)
            console.log(users[0])
            connection.commit()

        } catch(error) {
            console.log(error)
            connection.rollback()
        }
    })

}).catch((error)=> {
    console.log(error)
})


// unitOfWork.start((conn : PoolConnection)=> {
//     conn.query(
//         `INSERT INTO users
//          (job_id, name, age)
//          VALUES (?, ?, ?)`, [1, 'Cristina', 32], (error, results, fields)=> {
//              console.log(error, results, fields)
//              if(error) { throw error }
//
//              conn.query(
//                  `INSERT INTO jobs
//                   (title, salary)
//                   VALUES (?, ?)`, ['m', 25000], (error, results, fields)=> {
//                       if(error)
//                       {
//                           conn.rollback()
//                           throw error
//                       }
//                       console.log(results)
//                       conn.commit()
//              })
//          })
// })

// unitOfWork.start((conn : PoolConnection)=> {
//     conn.query(
//         `INSERT INTO users
//          (job_id, name, age)
//          VALUES (?, ?, ?)`, [1, 'Cristina', 32], (error, results, fields)=> {
//              console.log(error, results, fields)
//              if(error) { throw error }
//
//              conn.query(
//                  `INSERT INTO jobs
//                   (title, salary)
//                   VALUES (?, ?)`, ['m', 25000], (error, results, fields)=> {
//                       if(error)
//                       {
//                           conn.rollback()
//                           throw error
//                       }
//                       console.log(results)
//                       conn.commit()
//              })
//          })
// })


// jobRepo.createOne(developer).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
//
// userRepo.createOne(user).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
