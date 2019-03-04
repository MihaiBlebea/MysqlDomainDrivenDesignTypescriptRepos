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
const models_1 = require("./models");
const __1 = require("./../");
let connFactory = new __1.MysqlConnectionFactory('127.0.0.1', 'playground_db', 'admin', 'root', 32778);
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
let user = new models_1.User(1, 'Mihai', 29);
connFactory.getConnection((conn) => __awaiter(this, void 0, void 0, function* () {
    let userRepo = new UserRepository_1.default(conn);
    let result = yield userRepo.createOne(user);
    console.log(result);
}));
