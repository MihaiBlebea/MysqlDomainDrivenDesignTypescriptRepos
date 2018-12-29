
export class Create
{
    private values : String


    constructor(payload : Object)
    {
        this.values = `(${ Object.keys(payload).join(', ') })`
    }

    toString() : String
    {
        return `${ this.values } VALUES ?`
    }
}
