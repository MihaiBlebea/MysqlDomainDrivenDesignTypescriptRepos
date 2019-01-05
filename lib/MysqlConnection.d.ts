import * as mysql from 'mysql';
import { IMysqlConnection } from './interfaces';
export declare class MysqlConnection implements IMysqlConnection {
    private host;
    private user;
    private database;
    private password;
    constructor(host: string, user: string, database: string, password: string);
    connect(): mysql.Connection;
    query(query: string, params?: [string]): Promise<Object>;
}
