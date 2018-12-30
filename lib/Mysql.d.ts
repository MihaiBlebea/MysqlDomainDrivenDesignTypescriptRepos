import * as mysql from 'mysql';
import { MysqlInterface } from './MysqlInterface';
export declare class Mysql implements MysqlInterface {
    private host;
    private user;
    private database;
    private password;
    constructor(host: string, user: string, database: string, password: string);
    connect(): mysql.Connection;
    query(query: string, params?: [string]): Promise<Object>;
}
