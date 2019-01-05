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
        return new User_1.User(row.name, row.age);
    }
    deconstructModel(model) {
        return {
            name: model.getName(),
            age: model.getAge()
        };
    }
}
exports.UserRepository = UserRepository;
