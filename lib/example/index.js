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
const CarRepository_1 = require("./CarRepository");
const models_1 = require("./models");
const __1 = require("./../");
let factory = new __1.MysqlConnectionFactory('127.0.0.1', 'playground_db', 'admin', 'root', 32778);
const execute = (factory) => __awaiter(this, void 0, void 0, function* () {
    let unit = yield __1.UnitOfWork.begin(factory);
    let userRepo = new UserRepository_1.default(unit.connection);
    let carRepo = new CarRepository_1.default(unit.connection);
    try {
        let user = new models_1.User(1, 'Mihai', 29);
        yield userRepo.createOne(user);
        user.addCar(new models_1.Car('Mercedes', 5, 25000, 1));
        user.addCar(new models_1.Car('Clio', 3, 1500, 1));
        let cars = yield carRepo.createMany(user.cars);
        unit.complete();
        // console.log(savedUser)
        return user;
    }
    catch (error) {
        console.log(error);
        unit.rollback();
    }
});
// execute(factory).then((result)=> {
//     console.log(result)
// }).catch((error)=> {
//     console.log(error)
// })
let conn = factory.getConnection();
let userRepo = new UserRepository_1.default(conn);
userRepo.createOrUpdate(new models_1.User(1, 'Stefan', 40, 1)).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
