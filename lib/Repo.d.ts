import { MysqlInterface } from './MysqlInterface';
export declare abstract class Repo {
    protected conn: any;
    protected items: any[];
    abstract attributes: any[];
    abstract tableName: string;
    constructor(conn: MysqlInterface);
    nextId(): string;
    add(item: any): void;
    addAll(items?: []): void;
    remove(item: any): any;
    removeAll(items?: []): any;
    flush(): any;
    protected constructModels(rows: any): any;
    abstract constructModel(row: any): any;
    abstract deconstructModel(model: Object): Object;
    protected generateAttributeString(): string;
    protected generateUpdateAttributeString(): string;
    protected insertItems(): any;
    protected insertOrUpdateItems(): any;
    withId(id: String): any;
    all(): any;
}
