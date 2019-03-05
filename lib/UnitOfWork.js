"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnitOfWork {
    // static begin(connection : MysqlConnectionFactory, callback : Function)
    // {
    //     connection.getPoolConnection((conn: PoolConnection)=> {
    //         conn.beginTransaction((error : Error)=> {
    //             if(error) { throw error }
    //
    //             callback(new Unit(conn))
    //         })
    //     })
    // }
    static begin(factory) {
        return new Promise((resolve, reject) => {
            let conn = factory.getConnection();
            conn.beginTransaction((error) => {
                if (error) {
                    reject(error);
                }
                resolve(new Unit(conn));
            });
        });
    }
}
exports.UnitOfWork = UnitOfWork;
class Unit {
    constructor(conn) {
        this._conn = conn;
    }
    get connection() {
        return this._conn;
    }
    rollback() {
        this._conn.rollback();
        this._conn.end();
    }
    complete() {
        this._conn.commit();
        this._conn.end();
    }
}
exports.Unit = Unit;
