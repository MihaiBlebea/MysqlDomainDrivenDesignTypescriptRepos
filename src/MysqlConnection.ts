import { createPool, PoolConnection, Connection, Pool, Query } from 'mysql'
import { IMysqlConnection } from './interfaces'


export class MysqlConnection implements IMysqlConnection
{
    private host : string

    private database : string

    private user : string

    private password : string

    private port : number

    private _pool? : Pool

    private showQuery : Boolean = false


    constructor(host : string, database : string, user : string, password : string, port? : number)
    {
        this.host     = host
        this.database = database
        this.user     = user
        this.password = password
        this.port     = port || 3306

        this._pool = this.createPool()
    }

    createPool()
    {
        return createPool({
            host:     this.host,
            user:     this.user,
            database: this.database,
            password: this.password,
            port:     this.port
        })
    }

    getPool()
    {
        return this._pool
    }

    private isPoolAvailable()
    {
        return this._pool ? true : false
    }

    getConnection() : Promise<Connection | PoolConnection>
    {
        return new Promise((resolve, reject)=> {
            if(this.isPoolAvailable())
            {
                this._pool!.getConnection((error, conn)=> {
                    if(error) { reject(error) }
                    resolve(conn)
                })
            } else {
                reject(new Error('No connection available'))
            }
        })
    }

    isPoolConnection(connection? : Connection | PoolConnection) : connection is PoolConnection
    {
        return (<PoolConnection>connection).release !== undefined;
    }

    // async query(query : string, params : any[], connection? : Connection | PoolConnection) : Promise<Object>
    // {
    //     let conn = connection
    //     if(!connection)
    //     {
    //         conn = await this.getConnection()
    //     }
    //
    //     return new Promise((resolve, reject)=> {
    //         let queryMade = conn!.query(query, params, (error, result)=> {
    //
    //             // Log the query to the console
    //             this.logQuery(queryMade)
    //
    //             // If error reject and return Promise
    //             if(error) { return reject(error) }
    //
    //             // Release the current connection if this is not transaction
    //             // And if connection is of type PoolConnection
    //             if(connection === undefined && this.isPoolConnection(conn))
    //             {
    //                 conn!.release()
    //             }
    //
    //             return resolve(result)
    //         })
    //     })
    // }

    async startTransaction() : Promise<Connection | PoolConnection>
    {
        let connection = await this.getConnection()

        return new Promise((resolve, reject)=> {
            connection.beginTransaction((error : Error)=> {
                if(error) { reject(error) }

                // Return the connection to perform queries agains
                resolve(connection)
            })
        })
    }

    commitTransaction(connection : Connection | PoolConnection)
    {
        connection.commit()
        if(this.isPoolConnection(connection))
        {
            connection.release()
        }
    }

    rollbackTransaction(connection : Connection | PoolConnection)
    {
        connection.rollback()
        if(this.isPoolConnection(connection))
        {
            connection.release()
        }
    }

    private logQuery(query : Query)
    {
        if(this.showQuery)
        {
            console.log(query.sql)
        }
    }

}
