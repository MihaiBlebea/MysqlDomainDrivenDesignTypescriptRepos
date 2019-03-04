"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnitOfWork {
    static begin(connection, callback) {
        connection.getConnection((conn) => {
            conn.beginTransaction((error) => {
                if (error) {
                    throw error;
                }
                callback(new Unit(conn));
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
        this._conn.release();
    }
    complete() {
        this._conn.commit();
        this._conn.release();
    }
}
exports.Unit = Unit;
