import { BaseRepository } from './../BaseRepository';
import { User } from './models';
import { IMysqlConnection } from './../interfaces';
declare type UserDeconstructed = {
    job_id: Number;
    name: String;
    age: Number;
};
export declare class UserRepository<T> extends BaseRepository<T> {
    attributes: String[];
    constructor(connection: IMysqlConnection);
    constructModel(row: any): User;
    deconstructModel(model: User): UserDeconstructed;
    findName(name: String): any;
    findAge(age: Number): any;
    findNameAndAge(name: String, age: Number): any;
    deleteAll(): any;
}
export {};
