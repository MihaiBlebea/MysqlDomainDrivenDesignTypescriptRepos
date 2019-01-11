export declare class Job {
    private id?;
    private title;
    private salary;
    constructor(title: String, salary: Number, id?: Number);
    getId(): Number;
    getTitle(): String;
    getSalary(): Number;
}
