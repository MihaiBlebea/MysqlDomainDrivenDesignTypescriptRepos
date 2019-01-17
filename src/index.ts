import { MysqlConnection } from './MysqlConnection'
import { IMysqlConnection } from './interfaces'
import { BaseRepository } from './BaseRepository'
import { Deconstructed } from './types'


export namespace mysql {
    export const connect = (host : string, user : string, database : string, password : string)=> {
        return new MysqlConnection(host, user, database, password)
    }
}

export {
    BaseRepository,
    IMysqlConnection,
    MysqlConnection,
    Deconstructed
}
