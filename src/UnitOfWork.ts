import { PoolConnection, Connection } from 'mysql'
import { IMysqlConnection } from './interfaces'


export default class UnitOfWork
{
    private connection : Connection | PoolConnection


    constructor(connection : Connection | PoolConnection)
    {
        this.connection = connection
    }

    start(callback : Function)
    {
        this.connection.beginTransaction((error : Error)=> {
            if(error) { throw error }
        })
        callback(this.connection)
    }

    doWork()
    {

    }

    commit()
    {
        //
    }

    rollback()
    {
        //
    }
}
