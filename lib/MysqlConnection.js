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
        this.pool = this.createPool();
    }
    setup(options) {
        if (options.showQuery) {
            this.showQuery = options.showQuery;
        }
    }
    connect() {
        let conn = mysql_1.createConnection({
            host: this.host,
            user: this.user,
            database: this.database,
            password: this.password,
            port: this.port
        });
        conn.connect((error) => {
            if (error) {
                throw error;
            }
            console.log("Connected to the database!");
        });
        return conn;
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
        return this.pool ? true : false;
    }
    isConnectionAvailable() {
        return this.connection ? true : false;
    }
    query(query, params) {
        return new Promise((resolve, reject) => {
            if (this.isPoolAvailable()) {
                let queryMade = this.pool.query(query, params, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    this.logQuery(queryMade);
                    resolve(result);
                });
            }
            else if (this.isConnectionAvailable()) {
                let queryMade = this.connection.query(query, params, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    this.logQuery(queryMade);
                    resolve(result);
                });
            }
            else {
                reject(new Error('No connection available'));
            }
        });
    }
    logQuery(query) {
        if (this.showQuery) {
            console.log(query.sql);
        }
    }
}
exports.MysqlConnection = MysqlConnection;
