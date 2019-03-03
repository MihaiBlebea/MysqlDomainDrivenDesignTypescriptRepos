import { PoolConnection, Connection } from 'mysql'
import { IMysqlConnection } from './interfaces'


export default abstract class UnitOfWork
{
    static begin(connection : Connection | PoolConnection, callback : Function)
    {
        connection.beginTransaction((error : Error)=> {
            if(error) { throw error }
        })
        callback(connection)
    }
}
