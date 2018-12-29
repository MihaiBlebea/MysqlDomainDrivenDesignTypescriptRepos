"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Create {
    constructor(payload) {
        this.values = `(${Object.keys(payload).join(', ')})`;
    }
    toString() {
        return `${this.values} VALUES ?`;
    }
}
exports.Create = Create;
