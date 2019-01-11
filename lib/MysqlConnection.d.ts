import { Connection, Pool } from 'mysql';
import { IMysqlConnection } from './interfaces';
export declare class MysqlConnection implements IMysqlConnection {
    private host;
    private database;
    private user;
    private password;
    private port;
    private connection?;
    private pool?;
    private showQuery;
    constructor(host: string, database: string, user: string, password: string, port?: number);
    setup(options: {
        showQuery?: Boolean;
    }): void;
    connect(): Connection;
    createPool(): Pool;
    private isPoolAvailable;
    private isConnectionAvailable;
    query(query: string, params?: [string]): Promise<Object>;
    private logQuery;
}
