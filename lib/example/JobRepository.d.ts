import BaseRepository from './../BaseRepository';
import { Job } from './models';
import { PoolConnection, Connection } from 'mysql';
export default class JobRepository extends BaseRepository<Job> {
    attributes: String[];
    constructor(connection: PoolConnection | Connection);
    constructModel(row: any): Job;
    deconstructModel(model: Job): {
        title: String;
        salary: Number;
        id: Number | undefined;
    };
}
