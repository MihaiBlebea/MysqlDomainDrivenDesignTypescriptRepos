export class User
{
    private id? : Number

    private jobId : Number

    private name : String

    private age : Number

    constructor(jobId: Number, name : String, age : Number, id? : Number)
    {
        this.id    = id
        this.jobId = jobId
        this.name  = name
        this.age   = age
    }

    getId()
    {
        return this.id
    }

    getJobId()
    {
        return this.jobId
    }

    getName()
    {
        return this.name
    }

    getAge()
    {
        return this.age
    }
}
