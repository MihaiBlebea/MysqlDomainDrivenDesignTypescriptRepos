import { PoolConnection } from 'mysql';
import { MysqlConnectionFactory } from './';
export declare abstract class UnitOfWork {
    static begin(connection: MysqlConnectionFactory, callback: Function): void;
}
export declare class Unit {
    private _conn;
    constructor(conn: PoolConnection);
    readonly connection: PoolConnection;
    rollback(): void;
    complete(): void;
}
