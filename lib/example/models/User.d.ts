export declare class User {
    private id?;
    private jobId;
    private name;
    private age;
    constructor(jobId: Number, name: String, age: Number, id?: Number);
    getId(): Number | undefined;
    getJobId(): Number;
    getName(): String;
    getAge(): Number;
}
