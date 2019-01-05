import { IMysqlConnection, IRead, IWrite } from './interfaces';
import { StringOrNumber, OneOrManyObjects, Model, Deconstructed } from './types';
export declare abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
    protected connection: any;
    protected items: any[];
    abstract attributes: String[];
    protected tableName: String;
    constructor(connection: IMysqlConnection, tableName: String);
    query(query: String, values?: any): any;
    readonly table: String;
    createOne(model: Object): any;
    createMany(models: Object[]): any;
    protected create(values: StringOrNumber[] | StringOrNumber[][]): any;
    createOrUpdate(models: OneOrManyObjects): any;
    update(model: Model): any;
    delete(id: StringOrNumber | StringOrNumber[]): Promise<T>;
    abstract constructModel(row: any): Object;
    abstract deconstructModel(model: Object): Deconstructed;
    constructModels(rows: any): any;
    generateCreateString(): string;
    generateCreateOrUpdateString(): string;
    generateUpdateString(): string;
    findId(id: StringOrNumber): any;
    all(): any;
}
