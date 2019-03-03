import { PoolConnection, Connection, Pool } from 'mysql';
import { IMysqlConnection } from './interfaces';
export declare class MysqlConnection implements IMysqlConnection {
    private host;
    private database;
    private user;
    private password;
    private port;
    private _pool?;
    private showQuery;
    constructor(host: string, database: string, user: string, password: string, port?: number);
    createPool(): Pool;
    getPool(): Pool | undefined;
    private isPoolAvailable;
    getConnection(): Promise<Connection | PoolConnection>;
    isPoolConnection(connection?: Connection | PoolConnection): connection is PoolConnection;
    startTransaction(): Promise<Connection | PoolConnection>;
    commitTransaction(connection: Connection | PoolConnection): void;
    rollbackTransaction(connection: Connection | PoolConnection): void;
    private logQuery;
}
