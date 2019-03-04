"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class MysqlConnectionFactory {
    constructor(host, database, user, password, port) {
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
    isPoolAvailable() {
        return this._pool ? true : false;
    }
    get pool() {
        return this._pool;
    }
    getConnectionPromise() {
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
    getConnection(callback) {
        if (this.isPoolAvailable()) {
            this._pool.getConnection((error, conn) => {
                if (error) {
                    throw error;
                }
                callback(conn);
            });
        }
        else {
            throw new Error('No connection available');
        }
    }
}
exports.default = MysqlConnectionFactory;
