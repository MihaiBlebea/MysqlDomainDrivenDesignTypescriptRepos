import { BaseRepository } from './../BaseRepository';
import { User } from './models';
import { IMysqlConnection } from './../interfaces';
import { Deconstructed } from './../types';
export declare class UserRepository extends BaseRepository<User> {
    attributes: String[];
    constructor(connection: IMysqlConnection);
    constructModel(row: Deconstructed): User;
    deconstructModel(model: User): {
        id: Number | undefined;
        job_id: Number;
        name: String;
        age: Number;
    };
    findName(name: String): any;
    findAge(age: Number): Promise<any>;
    findNameAndAge(name: String, age: Number): Promise<any>;
    deleteAll(): Promise<User[]>;
}
