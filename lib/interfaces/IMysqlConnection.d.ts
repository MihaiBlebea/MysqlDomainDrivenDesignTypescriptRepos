import * as mysql from 'mysql';
export interface IMysqlConnection {
    connect(): mysql.Connection;
    query(query: String, params?: [String]): Promise<Object>;
}
