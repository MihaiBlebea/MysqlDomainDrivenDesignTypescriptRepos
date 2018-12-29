// import { Mysql } from './Mysql'
// import { Repo } from './Repo'
// import { MysqlInterface } from './MysqlInterface'
//
//
// export {
//     Mysql,
//     MysqlInterface,
//     Repo
// }
import { Mysql } from './Mysql'
import { MysqlInterface } from './MysqlInterface'
import { Repo } from './Repo'


export namespace mysql {
    export const connect = (host : string, user : string, database : string, password : string)=> {
        return new Mysql(host, user, database, password)
    }
}

export {
    Repo,
    MysqlInterface
}
