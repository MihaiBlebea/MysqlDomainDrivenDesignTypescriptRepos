import { PoolConnection, Connection, Pool } from 'mysql';
export interface IMysqlConnection {
    createPool(): Pool;
    getPool(): Pool | undefined;
    getConnection(): Promise<Connection | PoolConnection>;
}
