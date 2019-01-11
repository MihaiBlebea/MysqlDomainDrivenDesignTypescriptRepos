"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(connection, tableName) {
        this.connection = connection;
        this.tableName = tableName;
    }
    query(query, values) {
        return this.connection.query(query, values).then((rows) => {
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
        let values = Object.values(deconstructed);
        return this.create(values);
    }
    createMany(models) {
        let values = models.map((model) => {
            return Object.values(this.deconstructModel(model));
        });
        return this.create(values);
    }
    create(values) {
        return this.connection.query(`INSERT INTO ${this.tableName}
             ${this.generateCreateString()}
             VALUES (?)`, [values]);
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
        return this.connection.query(`INSERT INTO ${this.tableName}
             ${this.generateCreateString()}
             VALUES ?
             ON DUPLICATE KEY
             UPDATE ${this.generateCreateOrUpdateString()}`, [values]);
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
        return this.connection.query(`UPDATE ${this.tableName}
             SET ${this.generateUpdateString()}
             WHERE id = ?`, [values]);
    }
    delete(id) {
        return this.connection.query(`DELETE
             FROM ${this.tableName}
             WHERE id = ?`, [id]);
    }
    constructModels(rows) {
        return rows.map((row) => {
            return this.constructModel(row);
        });
    }
    generateCreateString() {
        return `( ${this.attributes.join(', ')})`;
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
        return this.connection.query(`SELECT *
             FROM ${this.tableName}
             WHERE id = ?`, [id]).then((rows) => {
            return this.constructModels(rows);
        });
    }
    all() {
        return this.connection.query(`SELECT *
             FROM ${this.tableName}`).then((rows) => {
            return this.constructModels(rows);
        });
    }
}
exports.BaseRepository = BaseRepository;
