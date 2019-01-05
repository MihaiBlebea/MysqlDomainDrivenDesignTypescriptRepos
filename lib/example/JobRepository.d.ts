import { BaseRepository } from './../BaseRepository';
import { IMysqlConnection } from './../interfaces';
import { Job } from './models';
export declare class JobRepository<T> extends BaseRepository<T> {
    attributes: String[];
    constructor(connection: IMysqlConnection);
    constructModel(row: any): Object;
    deconstructModel(model: Job): {
        title: String;
        salary: Number;
    };
}
