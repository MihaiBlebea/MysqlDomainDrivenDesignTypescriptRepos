import { PoolConnection, Connection, Pool, } from 'mysql'


export default interface IMysqlConnection
{
    createPool() : void

    getPool() : Pool | undefined

    getConnection() : Promise<Connection | PoolConnection>
}
