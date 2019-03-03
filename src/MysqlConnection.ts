import { createPool, PoolConnection, Connection, Pool, Query } from 'mysql'
import { IMysqlConnection } from './interfaces'


export default class MysqlConnection implements IMysqlConnection
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

    getPool() : Pool | undefined
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
}
