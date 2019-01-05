"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(jobId, name, age, id) {
        this.id = id;
        this.jobId = jobId;
        this.name = name;
        this.age = age;
    }
    getId() {
        return this.id;
    }
    getJobId() {
        return this.jobId;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}
exports.User = User;
