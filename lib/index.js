"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mysql_1 = require("./Mysql");
const Repo_1 = require("./Repo");
exports.Repo = Repo_1.Repo;
var mysql;
(function (mysql) {
    mysql.connect = (host, user, database, password) => {
        return new Mysql_1.Mysql(host, user, database, password);
    };
})(mysql = exports.mysql || (exports.mysql = {}));
