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
    // async query(query : string, params : any[], connection? : Connection | PoolConnection) : Promise<Object>
    // {
    //     let conn = connection
    //     if(!connection)
    //     {
    //         conn = await this.getConnection()
    //     }
    //
    //     return new Promise((resolve, reject)=> {
    //         let queryMade = conn!.query(query, params, (error, result)=> {
    //
    //             // Log the query to the console
    //             this.logQuery(queryMade)
    //
    //             // If error reject and return Promise
    //             if(error) { return reject(error) }
    //
    //             // Release the current connection if this is not transaction
    //             // And if connection is of type PoolConnection
    //             if(connection === undefined && this.isPoolConnection(conn))
    //             {
    //                 conn!.release()
    //             }
    //
    //             return resolve(result)
    //         })
    //     })
    // }
    startTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield this.getConnection();
            return new Promise((resolve, reject) => {
                connection.beginTransaction((error) => {
                    if (error) {
                        reject(error);
                    }
                    // Return the connection to perform queries agains
                    resolve(connection);
                });
            });
        });
    }
    commitTransaction(connection) {
        connection.commit();
        if (this.isPoolConnection(connection)) {
            connection.release();
        }
    }
    rollbackTransaction(connection) {
        connection.rollback();
        if (this.isPoolConnection(connection)) {
            connection.release();
        }
    }
    logQuery(query) {
        if (this.showQuery) {
            console.log(query.sql);
        }
    }
}
exports.MysqlConnection = MysqlConnection;
