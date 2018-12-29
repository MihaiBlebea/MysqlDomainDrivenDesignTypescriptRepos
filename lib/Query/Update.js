"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Update {
    constructor(payload) {
        this.pairs = [];
        this.pairs = Object.keys(payload).map((key, index) => {
            return `${key} = ?`;
        });
    }
    toString() {
        return `SET ${this.pairs.join(', ')}`;
    }
}
exports.Update = Update;
