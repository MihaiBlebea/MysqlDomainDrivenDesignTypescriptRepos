import { IMysqlConnection, IRead, IWrite } from './interfaces';
import { StringOrNumber, Deconstructed } from './types';
export declare abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
    protected connection: any;
    abstract attributes: String[];
    protected tableName: String;
    constructor(connection: IMysqlConnection, tableName: String);
    query(query: String, values?: any): Promise<T[]>;
    readonly table: String;
    createOne(model: T): any;
    createMany(models: T[]): any;
    protected create(values: StringOrNumber[] | StringOrNumber[][]): any;
    createOrUpdate(models: T | T[]): any;
    update(model: T): any;
    delete(id: StringOrNumber | StringOrNumber[]): any;
    abstract constructModel(row: Deconstructed): T;
    abstract deconstructModel(model: T): Deconstructed;
    constructModels(rows: Deconstructed): any;
    generateCreateString(): string;
    generateCreateOrUpdateString(): string;
    generateUpdateString(): string;
    findId(id: StringOrNumber): Promise<T[]>;
    all(): Promise<T[]>;
}
