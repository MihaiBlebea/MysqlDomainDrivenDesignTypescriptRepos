import * as mysql from 'mysql'
import { MysqlInterface } from './MysqlInterface'


export class Mysql implements MysqlInterface
{
    private host : string

    private user : string

    private database : string

    private password : string


    constructor(host : string, user : string, database : string, password : string)
    {
        this.host     = host
        this.user     = user
        this.database = database
        this.password = password
    }

    connect() : mysql.Connection
    {
        let conn = mysql.createConnection({
            host:     this.host,
            user:     this.user,
            database: this.database,
            password: this.password
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
