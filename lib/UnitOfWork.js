"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnitOfWork {
    constructor(connection) {
        this.connection = connection;
    }
    start(callback) {
        this.connection.beginTransaction((error) => {
            if (error) {
                throw error;
            }
        });
        callback(this.connection);
    }
    doWork() {
    }
    commit() {
        //
    }
    rollback() {
        //
    }
}
exports.default = UnitOfWork;
