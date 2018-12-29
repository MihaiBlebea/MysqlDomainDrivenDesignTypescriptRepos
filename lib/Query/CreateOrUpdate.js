"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateOrUpdate {
    constructor(payload) {
        this.values = `(${Object.keys(payload).join(', ')})`;
        this.update = this.generateUpdateValues(Object.keys(payload));
    }
    generateUpdateValues(keys) {
        let attributes = [];
        keys.forEach((key) => {
            if (key !== 'id') {
                attributes.push(`${key} = VALUES(${key})`);
            }
        });
        return attributes.join(', ');
    }
    toString() {
        return `${this.values} VALUES ? ON DUPLICATE KEY UPDATE ${this.update}`;
    }
}
exports.CreateOrUpdate = CreateOrUpdate;
