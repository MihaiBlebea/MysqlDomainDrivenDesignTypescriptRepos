import { PoolConnection, Connection, Pool } from 'mysql';
export default class MysqlConnectionFactory {
    private host;
    private database;
    private user;
    private password;
    private port;
    private _pool?;
    constructor(host: string, database: string, user: string, password: string, port?: number);
    private createPool;
    isPoolAvailable(): boolean;
    readonly pool: Pool | undefined;
    getPoolConnectionPromise(): Promise<Connection | PoolConnection>;
    getPoolConnection(callback: Function): void;
    getConnection(): Connection;
}
