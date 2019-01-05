export class User
{
    private name : String

    private age : Number

    constructor(name : String, age : Number)
    {
        this.name = name
        this.age  = age
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
