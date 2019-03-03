declare type StringNumberBoolean = String | Number | Boolean | undefined;
export interface IWrite<T> {
    createOne(model: T): Promise<T>;
    createMany(models: T[]): Promise<T>;
    createOrUpdate(models: T | T[]): Promise<T>;
    update(model: T): Promise<T>;
    delete(id: StringNumberBoolean | StringNumberBoolean[]): Promise<T>;
}
export {};
