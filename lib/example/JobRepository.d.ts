import { BaseRepository } from './../BaseRepository';
import { IMysqlConnection } from './../interfaces';
import { Job } from './models';
declare type JobDeconstructed = {
    title: String;
    salary: Number;
    id: Number;
};
export declare class JobRepository extends BaseRepository<Job> {
    attributes: String[];
    constructor(connection: IMysqlConnection);
    constructModel(row: JobDeconstructed): Job;
    deconstructModel(model: any): JobDeconstructed;
}
export {};
