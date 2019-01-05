export declare class User {
    private id?;
    private name;
    private age;
    constructor(name: String, age: Number, id?: Number);
    getId(): Number | undefined;
    getName(): String;
    getAge(): Number;
}
