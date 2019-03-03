"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnitOfWork {
    static begin(connection, callback) {
        connection.beginTransaction((error) => {
            if (error) {
                throw error;
            }
        });
        callback(connection);
    }
}
exports.default = UnitOfWork;
