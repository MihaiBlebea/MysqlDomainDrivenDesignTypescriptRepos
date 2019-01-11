import { BaseRepository } from './../BaseRepository';
import { User } from './models';
import { IMysqlConnection } from './../interfaces';
declare type UserDeconstructed = {
    job_id: Number;
    name: String;
    age: Number;
    id: Number;
};
export declare class UserRepository extends BaseRepository<User> {
    attributes: String[];
    constructor(connection: IMysqlConnection);
    constructModel(row: UserDeconstructed): User;
    deconstructModel(model: any): {
        id: any;
        job_id: any;
        name: any;
        age: any;
    };
    findName(name: String): any;
    findAge(age: Number): Promise<any>;
    findNameAndAge(name: String, age: Number): Promise<any>;
    deleteAll(): Promise<User[]>;
}
export {};
