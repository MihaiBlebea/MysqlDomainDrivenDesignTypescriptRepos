
export class Update
{
    private pairs : String[] = []

    constructor(payload : Object)
    {
        this.pairs = Object.keys(payload).map((key, index)=> {
            return `${ key } = ?`
        })
    }

    toString() : String
    {
        return `SET ${ this.pairs.join(', ') }`
    }
}
