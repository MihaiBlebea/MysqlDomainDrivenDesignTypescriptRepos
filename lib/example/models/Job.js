"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Job {
    constructor(title, salary, id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getSalary() {
        return this.salary;
    }
}
exports.Job = Job;
