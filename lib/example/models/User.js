"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, age, id) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}
exports.User = User;
