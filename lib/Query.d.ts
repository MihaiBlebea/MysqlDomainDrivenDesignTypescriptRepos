import { PoolConnection, Connection } from 'mysql';
export default abstract class Query {
    static execute(query: string, params: any[], connection: Connection | PoolConnection, options?: {
        [key: string]: any;
    }): Promise<any>;
}
