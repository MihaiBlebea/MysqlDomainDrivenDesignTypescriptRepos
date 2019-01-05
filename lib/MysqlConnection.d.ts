import { Connection } from 'mysql';
import { IMysqlConnection } from './interfaces';
export declare class MysqlConnection implements IMysqlConnection {
    private host;
    private database;
    private user;
    private password;
    private port;
    constructor(host: string, database: string, user: string, password: string, port?: number);
    connect(): Connection;
    query(query: string, params?: [string]): Promise<Object>;
}
