import { MysqlConnection } from './MysqlConnection';
import { IMysqlConnection } from './interfaces';
import { BaseRepository } from './BaseRepository';
import { Deconstructed } from './types';
export declare namespace mysql {
    const connect: (host: string, user: string, database: string, password: string) => MysqlConnection;
}
export { BaseRepository, IMysqlConnection, MysqlConnection, Deconstructed };
