import { BaseRepository } from './../BaseRepository';
import { IMysqlConnection } from './../interfaces';
import { Job } from './models';
import { Deconstructed } from './../types';
export declare class JobRepository extends BaseRepository<Job> {
    attributes: String[];
    constructor(connection: IMysqlConnection);
    constructModel(row: Deconstructed): Job;
    deconstructModel(model: Job): {
        title: String;
        salary: Number;
        id: Number | undefined;
    };
}
