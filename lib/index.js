"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnection_1 = require("./MysqlConnection");
exports.MysqlConnection = MysqlConnection_1.MysqlConnection;
const BaseRepository_1 = require("./BaseRepository");
exports.BaseRepository = BaseRepository_1.BaseRepository;
var mysql;
(function (mysql) {
    mysql.connect = (host, user, database, password) => {
        return new MysqlConnection_1.MysqlConnection(host, user, database, password);
    };
})(mysql = exports.mysql || (exports.mysql = {}));
