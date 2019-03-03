import { PoolConnection, Connection, Pool, Query } from 'mysql'


export interface IMysqlConnection
{
    createPool() : Pool

    getPool() : Pool | undefined

    getConnection() : Promise<Connection | PoolConnection>
}
