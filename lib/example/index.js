"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./UserRepository");
const JobRepository_1 = require("./JobRepository");
const models_1 = require("./models");
const MysqlConnection_1 = require("./../MysqlConnection");
let connection = new MysqlConnection_1.MysqlConnection('127.0.0.1', 'playground', 'admin', 'root', 32776);
let userRepo = new UserRepository_1.UserRepository(connection);
let jobRepo = new JobRepository_1.JobRepository(connection);
let developer = new models_1.Job('developer', 38000);
let mihai = new models_1.User(1, 'Mihai', 29);
// jobRepo.createOne(developer).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
// userRepo.createOne(mihai).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
