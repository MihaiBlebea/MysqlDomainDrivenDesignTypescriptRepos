import { BaseRepository } from './../BaseRepository';
import { User } from './models/User';
import { IMysqlConnection } from './../interfaces';
declare type UserDeconstructed = {
    name: String;
    age: Number;
};
export declare class UserRepository extends BaseRepository<User> {
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
