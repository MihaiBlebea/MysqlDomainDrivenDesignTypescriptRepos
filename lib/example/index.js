"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./UserRepository");
const JobRepository_1 = require("./JobRepository");
const MysqlConnection_1 = require("./../MysqlConnection");
let connection = new MysqlConnection_1.MysqlConnection('127.0.0.1', 'playground', 'admin', 'root', 32777);
let userRepo = new UserRepository_1.UserRepository(connection);
let jobRepo = new JobRepository_1.JobRepository(connection);
// let developer = new Job('developer', 38000)
// let mihai = new User(1, 'Mihai', 29)
userRepo.findId(1).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
