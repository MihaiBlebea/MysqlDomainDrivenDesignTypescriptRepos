export declare class Query {
    private _table;
    private conditions;
    constructor(table: String);
    static table(table: String): Query;
    where(left: String, sign: String, right?: String | Number): this;
    orWhere(left: String, sign: String, right?: String | Number): this;
    update(payload: Object): string;
    create(payload: Object): string;
    createOrUpdate(payload: Object): string;
    delete(): string;
    select(): string;
    clearConditions(): void;
}
