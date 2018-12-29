"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateOrUpdate_1 = require("./CreateOrUpdate");
const Update_1 = require("./Update");
const Create_1 = require("./Create");
class Query {
    constructor(table) {
        this.conditions = '';
        this._table = table;
    }
    static table(table) {
        return new Query(table);
    }
    where(left, sign, right) {
        if (!right) {
            right = sign;
            sign = '=';
        }
        if (this.conditions.includes('WHERE')) {
            this.conditions += ' AND';
        }
        else {
            this.conditions += 'WHERE';
        }
        this.conditions += ` ${left} ${sign} ?`;
        return this;
    }
    orWhere(left, sign, right) {
        if (!right) {
            right = sign;
            sign = '=';
        }
        this.conditions += ` OR ${left} ${sign} ?`;
        return this;
    }
    update(payload) {
        let update = new Update_1.Update(payload);
        let result = `UPDATE ${this._table} ${update.toString()} ${this.conditions}`;
        this.clearConditions();
        return result;
    }
    create(payload) {
        let create = new Create_1.Create(payload);
        return `INSERT INTO ${this._table} ${create.toString()}`;
    }
    createOrUpdate(payload) {
        let createOrUpdate = new CreateOrUpdate_1.CreateOrUpdate(payload);
        return `INSERT INTO ${this._table} ${createOrUpdate.toString()}`;
    }
    delete() {
        let result = `DELETE FROM ${this._table} ${this.conditions}`;
        this.clearConditions();
        return result;
    }
    select() {
        let result = `SELECT * FROM ${this._table} ${this.conditions}`;
        this.clearConditions();
        return result;
    }
    clearConditions() {
        this.conditions = '';
    }
}
exports.Query = Query;
