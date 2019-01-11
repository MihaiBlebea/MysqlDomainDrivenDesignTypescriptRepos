import { createConnection, createPool, Connection, Pool, Query } from 'mysql'
import { IMysqlConnection } from './interfaces'


export class MysqlConnection implements IMysqlConnection
{
    private host : string

    private database : string

    private user : string

    private password : string

    private port : number

    private connection? : Connection

    private pool? : Pool

    private showQuery : Boolean


    constructor(host : string, database : string, user : string, password : string, port? : number)
    {
        this.host     = host
        this.database = database
        this.user     = user
        this.password = password
        this.port     = port || 3306

        this.pool = this.createPool()
    }

    setup(options : { showQuery? : Boolean })
    {
        if(options.showQuery)
        {
            this.showQuery = options.showQuery
        }
    }

    connect() : Connection
    {
        let conn = createConnection({
            host:     this.host,
            user:     this.user,
            database: this.database,
            password: this.password,
            port:     this.port
        })

        conn.connect((error)=> {
            if(error)
            {
                throw error;
            }
            console.log("Connected to the database!")
        })

        return conn
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

    private isPoolAvailable()
    {
        return this.pool ? true : false
    }

    private isConnectionAvailable()
    {
        return this.connection ? true : false
    }

    query(query : string, params? : [string]) : Promise<Object>
    {
        return new Promise((resolve, reject)=> {
            if(this.isPoolAvailable())
            {
                let queryMade = this.pool.query(query, params, (error, result)=> {
                    if(error)
                    {
                        reject(error)
                    }
                    this.logQuery(queryMade)
                    resolve(result)
                })
            } else if(this.isConnectionAvailable()) {
                let queryMade = this.connection.query(query, params, (error, result)=> {
                    if(error)
                    {
                        reject(error)
                    }
                    this.logQuery(queryMade)
                    resolve(result)
                })
            } else {
                reject(new Error('No connection available'))
            }
        })
    }

    private logQuery(query : Query)
    {
        if(this.showQuery)
        {
            console.log(query.sql)
        }
    }
}
