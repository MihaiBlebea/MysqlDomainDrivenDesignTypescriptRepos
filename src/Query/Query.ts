import { CreateOrUpdate } from './CreateOrUpdate'
import { Update } from './Update'
import { Create } from './Create'
import { Mysql } from './../Mysql'



export class Query
{
    private _table : String

    private conditions : String = ''


    constructor(table : String)
    {
        this._table = table
    }

    static table(table : String)
    {
        return new Query(table)
    }

    where(left : String, sign : String, right? : String | Number)
    {
        if(!right)
        {
            right = sign
            sign = '='
        }

        if(this.conditions!.includes('WHERE'))
        {
            this.conditions += ' AND'
        } else {
            this.conditions += 'WHERE'
        }

        this.conditions += ` ${left} ${sign} ?`
        return this
    }

    orWhere(left : String, sign : String, right? : String | Number)
    {
        if(!right)
        {
            right = sign
            sign = '='
        }

        this.conditions += ` OR ${left} ${sign} ?`
        return this
    }

    update(payload : Object)
    {
        let update = new Update(payload)

        let result = `UPDATE ${ this._table } ${ update.toString() } ${ this.conditions }`
        this.clearConditions()

        return result
    }

    create(payload : Object)
    {
        let create = new Create(payload)

        return `INSERT INTO ${ this._table } ${ create.toString() }`
    }

    createOrUpdate(payload : Object)
    {
        let createOrUpdate = new CreateOrUpdate(payload)

        return `INSERT INTO ${ this._table } ${ createOrUpdate.toString() }`
    }

    delete()
    {
        let result = `DELETE FROM ${ this._table } ${ this.conditions }`
        this.clearConditions()

        return result
    }

    select()
    {
        let result = `SELECT * FROM ${ this._table } ${ this.conditions }`
        this.clearConditions()

        return result
    }

    clearConditions()
    {
        this.conditions = ''
    }

}
