import BaseRepository from './../BaseRepository';
import { User } from './models';
import { PoolConnection, Connection } from 'mysql';
export default class UserRepository extends BaseRepository<User> {
    attributes: String[];
    constructor(connection: PoolConnection | Connection);
    constructModel(row: any): User;
    deconstructModel(model: User): {
        id: number | undefined;
        job_id: Number;
        name: String;
        age: Number;
    };
    findName(name: String): Promise<User[]>;
    findAge(age: Number): Promise<User[]>;
    findNameAndAge(name: String, age: Number): Promise<User[]>;
    deleteAll(): Promise<User[]>;
}
