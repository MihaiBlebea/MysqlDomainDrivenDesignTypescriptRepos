import { createConnection, Connection } from 'mysql'
import { IMysqlConnection } from './interfaces'


export class MysqlConnection implements IMysqlConnection
{
    private host : string

    private database : string

    private user : string

    private password : string

    private port : number


    constructor(host : string, database : string, user : string, password : string, port? : number)
    {
        this.host     = host
        this.database = database
        this.user     = user
        this.password = password
        this.port     = port || 3306
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
            console.log("Connected!")
        })

        return conn
    }

    query(query : string, params? : [string]) : Promise<Object>
    {
        return new Promise((resolve, reject)=> {
            let connection = this.connect()
            connection.query(query, params, (error, result)=> {
                if(error)
                {
                    reject(error)
                }
                resolve(result)
            })
            connection.end()
        })
    }
}
