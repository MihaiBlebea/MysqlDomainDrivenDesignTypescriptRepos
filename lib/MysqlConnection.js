"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class MysqlConnection {
    constructor(host, database, user, password, port) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.port = port || 3306;
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
