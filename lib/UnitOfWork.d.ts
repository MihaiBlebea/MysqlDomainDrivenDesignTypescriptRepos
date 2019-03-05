import { Connection } from 'mysql';
import { MysqlConnectionFactory } from './';
export declare abstract class UnitOfWork {
    static begin(factory: MysqlConnectionFactory): Promise<Unit>;
}
export declare class Unit {
    private _conn;
    constructor(conn: Connection);
    readonly connection: Connection;
    rollback(): void;
    complete(): void;
}
