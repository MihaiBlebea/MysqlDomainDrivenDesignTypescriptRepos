import { PoolConnection, Connection, Pool } from 'mysql';
export default class MysqlConnectionFactory {
    private host;
    private database;
    private user;
    private password;
    private port;
    private _pool;
    constructor(host: string, database: string, user: string, password: string, port?: number);
    private createPool;
    private isPoolAvailable;
    readonly pool: Pool;
    getConnectionPromise(): Promise<Connection | PoolConnection>;
    getConnection(callback: Function): void;
}
