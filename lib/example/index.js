"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./UserRepository");
const models_1 = require("./models");
const MysqlConnection_1 = require("./../MysqlConnection");
let connection = new MysqlConnection_1.MysqlConnection('127.0.0.1', 'playground', 'admin', 'root', 32776);
let repository = new UserRepository_1.UserRepository(connection);
let mihai = new models_1.User('Mihai', 29);
// repository.createOne(mihai).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
// repository.findName('Mihai').then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
// repository.findNameAndAge('Mihai', 29).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
repository.deleteAll().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
