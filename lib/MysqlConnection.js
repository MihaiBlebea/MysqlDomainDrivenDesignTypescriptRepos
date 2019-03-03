"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class MysqlConnection {
    constructor(host, database, user, password, port) {
        this.showQuery = false;
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port || 3306;
        this._pool = this.createPool();
    }
    createPool() {
        return mysql_1.createPool({
            host: this.host,
            user: this.user,
            database: this.database,
            password: this.password,
            port: this.port
        });
    }
    getPool() {
        return this._pool;
    }
    isPoolAvailable() {
        return this._pool ? true : false;
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            if (this.isPoolAvailable()) {
                this._pool.getConnection((error, conn) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(conn);
                });
            }
            else {
                reject(new Error('No connection available'));
            }
        });
    }
    isPoolConnection(connection) {
        return connection.release !== undefined;
    }
}
exports.default = MysqlConnection;
