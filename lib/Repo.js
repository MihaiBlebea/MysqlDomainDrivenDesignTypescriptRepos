"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v1");
class Repo {
    constructor(conn) {
        this.items = [];
        this.attributes = [];
        this.conn = conn;
    }
    nextId() {
        return uuid();
    }
    add(item) {
        this.items.push(item);
    }
    addAll(items = []) {
        items.map((item) => {
            this.add(item);
        });
    }
    remove(item) {
        return this.conn.query(`DELETE
             FROM ${this.tableName}
             WHERE id = ?`, [item.id]);
    }
    removeAll(items = []) {
        let ids = items.map((item) => {
            return [item.id];
        });
        return this.conn.query(`DELETE
             FROM ${this.tableName}
             WHERE id IN (?)`, [ids]);
    }
    flush() {
        return this.insertOrUpdateItems().then((result) => {
            this.items = [];
            return result;
        });
    }
    constructModels(rows) {
        return rows.map((row) => {
            return this.constructModel(row);
        });
    }
    generateAttributeString() {
        return `( ${this.attributes.join(', ')})`;
    }
    generateUpdateAttributeString() {
        let attributes = [];
        this.attributes.forEach((attribute) => {
            if (attribute !== 'id') {
                attributes.push(`${attribute} = VALUES(${attribute})`);
            }
        });
        return attributes.join(', ');
    }
    insertItems() {
        let items = this.items.map((item) => {
            return Object.values(item);
        });
        return this.conn.query(`INSERT INTO ${this.tableName}
             ${this.generateAttributeString()}
             VALUES ?`, [items]);
    }
    insertOrUpdateItems() {
        let items = this.items.map((item) => {
            let mappedObject = this.deconstructModel(item);
            return Object.values(mappedObject);
        });
        return this.conn.query(`INSERT INTO ${this.tableName}
             ${this.generateAttributeString()}
             VALUES ?
             ON DUPLICATE KEY
             UPDATE ${this.generateUpdateAttributeString()}`, [items]);
    }
    withId(id) {
        return this.conn.query(`SELECT *
             FROM ${this.tableName}
             WHERE id = ?`, [id]).then((rows) => {
            return this.constructModels(rows);
        });
    }
    all() {
        return this.conn.query(`SELECT *
             FROM ${this.tableName}`).then((rows) => {
            return this.constructModels(rows);
        });
    }
}
exports.Repo = Repo;
