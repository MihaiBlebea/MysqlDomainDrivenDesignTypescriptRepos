import { PoolConnection, Connection } from 'mysql';
export default abstract class UnitOfWork {
    static begin(connection: Connection | PoolConnection, callback: Function): void;
}
