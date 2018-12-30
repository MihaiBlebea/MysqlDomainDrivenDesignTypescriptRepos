import { Mysql } from './Mysql';
import { MysqlInterface } from './MysqlInterface';
import { Repo } from './Repo';
export declare namespace mysql {
    const connect: (host: string, user: string, database: string, password: string) => Mysql;
}
export { Repo, MysqlInterface };
