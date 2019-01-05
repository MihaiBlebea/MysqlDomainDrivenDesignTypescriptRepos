"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./../BaseRepository");
const User_1 = require("./models/User");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor(connection) {
        super(connection, 'users');
        this.attributes = ['name', 'age'];
    }
    constructModel(row) {
        return new User_1.User(row.name, row.age, row.id);
    }
    deconstructModel(model) {
        return {
            name: model.getName(),
            age: model.getAge()
        };
    }
    findName(name) {
        return this.connection.query(`SELECT *
             FROM ${this.table}
             WHERE name = ?`, [name]).then((rows) => {
            console.log(rows);
            return this.constructModels(rows);
        });
    }
    findAge(age) {
        return this.query(`SELECT *
             FROM ${this.table}
             WHERE age = ?`, [age]).then((result) => {
            return result;
        });
    }
    findNameAndAge(name, age) {
        return this.query(`SELECT *
             FROM ${this.table}
             WHERE name = ?
             AND age = ?`, [name, age]).then((result) => {
            return result;
        });
    }
    deleteAll() {
        return this.query(`DELETE FROM ${this.table}`);
    }
}
exports.UserRepository = UserRepository;
