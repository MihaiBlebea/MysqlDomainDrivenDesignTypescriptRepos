import { Pool } from 'mysql';
export default interface IMysqlConnection {
    createPool(): void;
    getPool(): Pool | undefined;
    getConnection(callback: Function): void;
}
