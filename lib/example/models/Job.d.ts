export default class Job {
    private id?;
    private title;
    private salary;
    constructor(title: String, salary: Number, id?: Number);
    getId(): Number | undefined;
    getTitle(): String;
    getSalary(): Number;
}
