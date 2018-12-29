
export class CreateOrUpdate
{
    private values : String

    private update : String


    constructor(payload : Object)
    {
        this.values = `(${ Object.keys(payload).join(', ') })`
        this.update = this.generateUpdateValues(Object.keys(payload))
    }

    generateUpdateValues(keys : String[])
    {
        let attributes : String[] = []
        keys.forEach((key)=> {
            if(key !== 'id')
            {
                attributes.push( `${ key } = VALUES(${ key })` )
            }
        })
        return attributes.join(', ')
    }

    toString()
    {
        return `${ this.values } VALUES ? ON DUPLICATE KEY UPDATE ${ this.update }`
    }
}
