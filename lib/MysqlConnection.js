"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MysqlConnection {
    constructor(host, user, database, password) {
        this.host = host;
        this.user = user;
        this.database = database;
        this.password = password;
    }
    connect() {
        let conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            database: this.database,
            password: this.password
        });
        conn.connect((error) => {
            if (error) {
                throw error;
            }
            console.log("Connected!");
        });
        return conn;
    }
    query(query, params) {
        return new Promise((resolve, reject) => {
            let connection = this.connect();
            connection.query(query, params, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
            connection.end();
        });
    }
}
exports.MysqlConnection = MysqlConnection;
