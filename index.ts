import { Mysql, MysqlInterface, Repo } from './src'

export namespace mysql {
    export const connect = (host : string, user : string, database : string, password : string)=> {
        return new Mysql(host, user, database, password)
    }
}

export {
    Repo,
    MysqlInterface
}
