import { PoolConnection, Connection } from 'mysql'
import { MysqlConnectionFactory } from './'


export abstract class UnitOfWork
{
    // static begin(connection : MysqlConnectionFactory, callback : Function)
    // {
    //     connection.getPoolConnection((conn: PoolConnection)=> {
    //         conn.beginTransaction((error : Error)=> {
    //             if(error) { throw error }
    //
    //             callback(new Unit(conn))
    //         })
    //     })
    // }

    static begin(factory : MysqlConnectionFactory) : Promise<Unit>
    {
        return new Promise((resolve, reject)=> {
            let conn = factory.getConnection()
            conn.beginTransaction((error : Error)=> {
                if(error) { reject(error) }

                resolve(new Unit(conn))
            })
        })
    }
}


export class Unit
{
    private _conn : Connection

    constructor(conn : Connection)
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
        this._conn.end()
    }

    complete()
    {
        this._conn.commit()
        this._conn.end()
    }
}
