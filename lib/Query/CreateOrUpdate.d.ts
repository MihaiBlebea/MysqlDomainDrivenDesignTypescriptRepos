export declare class CreateOrUpdate {
    private values;
    private update;
    constructor(payload: Object);
    generateUpdateValues(keys: String[]): string;
    toString(): string;
}
