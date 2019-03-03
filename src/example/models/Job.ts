export default class Job
{
    private id? : Number

    private title : String

    private salary : Number

    constructor(title : String, salary : Number, id? : Number)
    {
        this.id     = id
        this.title  = title
        this.salary = salary
    }

    getId()
    {
        return this.id
    }

    getTitle()
    {
        return this.title
    }

    getSalary()
    {
        return this.salary
    }
}
