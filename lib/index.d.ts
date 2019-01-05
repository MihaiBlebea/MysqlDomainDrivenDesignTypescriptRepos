import { MysqlConnection } from './MysqlConnection';
import { IMysqlConnection } from './interfaces';
import { BaseRepository } from './BaseRepository';
export declare namespace mysql {
    const connect: (host: string, user: string, database: string, password: string) => MysqlConnection;
}
export { BaseRepository, IMysqlConnection, MysqlConnection };
