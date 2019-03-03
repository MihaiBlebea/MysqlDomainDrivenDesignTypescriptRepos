"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./../BaseRepository");
const models_1 = require("./models");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor(connection) {
        super(connection, 'users');
        this.attributes = ['job_id', 'name', 'age'];
    }
    constructModel(row) {
        return new models_1.User(row.job_id, row.name, row.age, row.id);
    }
    deconstructModel(model) {
        return {
            id: model.getId(),
            job_id: model.getJobId(),
            name: model.getName(),
            age: model.getAge()
        };
    }
    findName(name) {
        return this.query(`SELECT *
             FROM ${this.table}
             WHERE name = ?`, [name]);
    }
    findAge(age) {
        return this.query(`SELECT *
             FROM ${this.table}
             WHERE age = ?`, [age]);
    }
    findNameAndAge(name, age) {
        return this.query(`SELECT *
             FROM ${this.table}
             WHERE name = ?
             AND age = ?`, [name, age]);
    }
    deleteAll() {
        return this.query(`DELETE FROM ${this.table}`);
    }
}
exports.default = UserRepository;
