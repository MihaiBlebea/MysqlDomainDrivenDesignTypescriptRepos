export class User
{
    private id? : Number

    private name : String

    private age : Number

    constructor(name : String, age : Number, id? : Number)
    {
        this.id   = id
        this.name = name
        this.age  = age
    }

    getId()
    {
        return this.id
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
