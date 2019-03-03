import { PoolConnection, Connection } from 'mysql';
import { IRead, IWrite } from './interfaces';
declare type StringNumberBoolean = String | Number | Boolean | undefined;
declare type DeconstructedModel = {
    [key: string]: any;
};
export default abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
    protected connection: PoolConnection | Connection;
    abstract attributes: String[];
    protected tableName: String;
    constructor(connection: PoolConnection | Connection, tableName: String);
    query(query: string, values?: any): Promise<T[]>;
    readonly table: String;
    createOne(model: T): Promise<any>;
    createMany(models: T[]): Promise<any>;
    protected create(values: StringNumberBoolean[] | StringNumberBoolean[][]): Promise<any>;
    createOrUpdate(models: T | T[]): Promise<any>;
    update(model: T): Promise<any>;
    delete(id: StringNumberBoolean | StringNumberBoolean[]): Promise<any>;
    abstract constructModel(row: DeconstructedModel): T;
    abstract deconstructModel(model: T): {
        [key: string]: StringNumberBoolean;
    };
    constructModels(rows: DeconstructedModel): any;
    generateCreateString(): string;
    generateCreateOrUpdateString(): string;
    generateUpdateString(): string;
    findId(id: string | number): Promise<T[]>;
    all(): Promise<T[]>;
}
export {};
