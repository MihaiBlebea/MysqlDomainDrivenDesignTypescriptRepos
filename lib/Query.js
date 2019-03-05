"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    static execute(query, params, connection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let queryMade = connection.query(query, params, (error, result) => {
                    // Log the query to the console
                    if (options && options.logQuery === true) {
                        console.log(queryMade.sql);
                    }
                    console.log(queryMade.sql);
                    // If error reject and return Promise
                    if (error) {
                        return reject(error);
                    }
                    // Release the current connection if this is not transaction
                    // And if connection is of type PoolConnection
                    // if(connection === undefined && this.isPoolConnection(conn))
                    // {
                    //     conn!.release()
                    // }
                    return resolve(result);
                });
            });
        });
    }
}
exports.default = Query;
