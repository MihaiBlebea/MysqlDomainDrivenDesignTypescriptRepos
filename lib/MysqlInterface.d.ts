import * as mysql from 'mysql';
export interface MysqlInterface {
    connect(): mysql.Connection;
    query(query: String, params?: [String]): Promise<Object>;
}
