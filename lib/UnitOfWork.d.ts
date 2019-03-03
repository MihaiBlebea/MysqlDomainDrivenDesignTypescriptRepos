import { PoolConnection, Connection } from 'mysql';
export default class UnitOfWork {
    private connection;
    constructor(connection: Connection | PoolConnection);
    start(callback: Function): void;
    doWork(): void;
    commit(): void;
    rollback(): void;
}
