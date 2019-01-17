"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./../BaseRepository");
const models_1 = require("./models");
// type JobDeconstructed = {
//     title : String,
//     salary: Number,
//     id : Number
// }
class JobRepository extends BaseRepository_1.BaseRepository {
    constructor(connection) {
        super(connection, 'jobs');
        this.attributes = ['title', 'salary'];
    }
    constructModel(row) {
        return new models_1.Job(row.title, row.salary, row.id);
    }
    deconstructModel(model) {
        return {
            title: model.getTitle(),
            salary: model.getSalary(),
            id: model.getId()
        };
    }
}
exports.JobRepository = JobRepository;
