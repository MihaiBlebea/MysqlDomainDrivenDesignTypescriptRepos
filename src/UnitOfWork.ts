import { PoolConnection, Connection } from 'mysql'
import { MysqlConnectionFactory } from './'


export abstract class UnitOfWork
{
    static begin(connection : MysqlConnectionFactory, callback : Function)
    {
        connection.getConnection((conn: PoolConnection)=> {
            conn.beginTransaction((error : Error)=> {
                if(error) { throw error }

                callback(new Unit(conn))
            })
        })
    }
}


export class Unit
{
    private _conn : PoolConnection

    constructor(conn : PoolConnection)
    {
        this._conn = conn
    }

    get connection()
    {
        return this._conn
    }

    rollback()
    {
        this._conn.rollback()
        this._conn.release()
    }

    complete()
    {
        this._conn.commit()
        this._conn.release()
    }
}
