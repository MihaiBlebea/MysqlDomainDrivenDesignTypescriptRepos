"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./UserRepository");
const JobRepository_1 = require("./JobRepository");
const CarRepository_1 = require("./CarRepository");
const models_1 = require("./models");
const MysqlConnection_1 = require("./../MysqlConnection");
const __1 = require("./../");
let mysql = new MysqlConnection_1.MysqlConnection('127.0.0.1', 'playground_db', 'admin', 'root', 32778);
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
mysql.getConnection().then((conn) => __awaiter(this, void 0, void 0, function* () {
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
    let unit = new __1.UnitOfWork(conn);
    unit.start((connection) => __awaiter(this, void 0, void 0, function* () {
        let userRepo = new UserRepository_1.default(conn);
        let jobRepo = new JobRepository_1.default(conn);
        let carRepo = new CarRepository_1.default(conn);
        let developer = new models_1.Job('daaa', 38000);
        let user = new models_1.User(1, 'Mihai', 29);
        user.addCar(new models_1.Car('Mercedes', 5, 25000, 1));
        user.addCar(new models_1.Car('Clio', 3, 1500, 1));
        try {
            // let jobResult  = await jobRepo.createOne(developer)
            // let userResult = await userRepo.createOne(user)
            // let carResult  = await carRepo.createMany(user.cars)
            let users = yield userRepo.findId(1);
            let cars = yield carRepo.findUserId(users[0].getId());
            users[0].addCars(cars);
            console.log(users[0]);
            connection.commit();
        }
        catch (error) {
            console.log(error);
            connection.rollback();
        }
    }));
})).catch((error) => {
    console.log(error);
});
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
