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
const Query_1 = require("./Query");
class BaseRepository {
    constructor(connection, tableName) {
        this.connection = connection;
        this.tableName = tableName;
    }
    query(query, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield Query_1.default.execute(query, values, this.connection, { logQuery: true });
            if (Array.isArray(rows)) {
                return this.constructModels(rows);
            }
            return rows;
        });
    }
    get table() {
        return this.tableName;
    }
    createOne(model) {
        let deconstructed = this.deconstructModel(model);
        let values = [];
        Object.keys(deconstructed).forEach((key) => {
            if (key !== 'id') {
                values.push(deconstructed[key]);
            }
        });
        return this.create([values]);
    }
    createMany(models) {
        let values = models.map((model) => {
            return Object.values(this.deconstructModel(model));
        });
        return this.create(values);
    }
    create(values) {
        return Query_1.default.execute(`INSERT INTO ${this.tableName}
             ${this.generateCreateString()}
             VALUES ?`, [values], this.connection);
    }
    createOrUpdate(models) {
        let values;
        if (Array.isArray(models)) {
            values = models.map((model) => {
                return Object.values(this.deconstructModel(model));
            });
        }
        else {
            let model = models;
            values = Object.values(this.deconstructModel(model));
        }
        return Query_1.default.execute(`INSERT INTO ${this.tableName}
             ${this.generateCreateString()}
             VALUES ?
             ON DUPLICATE KEY
             UPDATE ${this.generateCreateOrUpdateString()}`, [values], this.connection);
    }
    update(model) {
        let deconstructed = this.deconstructModel(model);
        let values = [];
        Object.keys(deconstructed).forEach((key) => {
            if (key !== 'id') {
                values.push(deconstructed[key]);
            }
        });
        values.push(deconstructed.id);
        return Query_1.default.execute(`UPDATE ${this.tableName}
             SET ${this.generateUpdateString()}
             WHERE id = ?`, [values], this.connection);
    }
    delete(id) {
        return Query_1.default.execute(`DELETE
             FROM ${this.tableName}
             WHERE id = ?`, [id], this.connection);
    }
    constructModels(rows) {
        return rows.map((row) => {
            return this.constructModel(row);
        });
    }
    generateCreateString() {
        let attributes = this.attributes.filter((attribute) => {
            return attribute !== 'id';
        });
        return `(${attributes.join(', ')})`;
    }
    generateCreateOrUpdateString() {
        let attributes = [];
        this.attributes.forEach((attribute) => {
            if (attribute !== 'id') {
                attributes.push(`${attribute} = VALUES(${attribute})`);
            }
        });
        return attributes.join(', ');
    }
    generateUpdateString() {
        let attributes = [];
        this.attributes.forEach((attribute) => {
            if (attribute !== 'id') {
                attributes.push(`${attribute} = ?`);
            }
        });
        return attributes.join(', ');
    }
    findId(id) {
        return this.query(`SELECT *
                     FROM ${this.tableName}
                     WHERE id = ?`, [id]);
    }
    all() {
        return this.query(`SELECT * FROM ${this.tableName}`);
    }
}
exports.default = BaseRepository;
