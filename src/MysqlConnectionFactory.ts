import { createPool, createConnection, PoolConnection, Connection, Pool } from 'mysql'


export default class MysqlConnectionFactory
{
    private host : string

    private database : string

    private user : string

    private password : string

    private port : number

    private _pool? : Pool


    constructor(host : string, database : string, user : string, password : string, port? : number)
    {
        this.host     = host
        this.database = database
        this.user     = user
        this.password = password
        this.port     = port || 3306

        this._pool = this.createPool()
    }

    private createPool()
    {
        return createPool({
            host:     this.host,
            user:     this.user,
            database: this.database,
            password: this.password,
            port:     this.port
        })
    }

    isPoolAvailable()
    {
        return this._pool ? true : false
    }

    get pool() : Pool | undefined
    {
        return this._pool
    }

    getPoolConnectionPromise() : Promise<Connection | PoolConnection>
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

    getPoolConnection(callback : Function)
    {
        if(this.isPoolAvailable())
        {
            this._pool!.getConnection((error, conn)=> {
                if(error) { throw error }
                callback(conn)
            })
        } else {
            throw new Error('No connection available')
        }
    }

    getConnection()
    {
        return createConnection({
            host:     this.host,
            user:     this.user,
            database: this.database,
            password: this.password,
            port:     this.port
        })
    }
}
