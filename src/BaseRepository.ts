import { IMysqlConnection, IRead, IWrite } from './interfaces'
import { StringOrNumber, OneOrManyObjects, Model, Deconstructed } from './types'



export abstract class BaseRepository<T> implements IRead<T>, IWrite<T>
{
    protected connection : any

    protected items : any[] = []

    abstract attributes : String[]

    protected tableName : String


    constructor(connection : IMysqlConnection, tableName : String)
    {
        this.connection = connection
        this.tableName  = tableName
    }

    createOne(model : Object)
    {
        let deconstructed = this.deconstructModel(model)
        let values = Object.values(deconstructed)

        return this.create(values)
    }

    createMany(models : Object[])
    {
        let values = models.map((model)=> {
            return Object.values(this.deconstructModel(model))
        })

        return this.create(values)
    }

    protected create(values : StringOrNumber[] | StringOrNumber[][])
    {
        return this.connection.query(
            `INSERT INTO ${ this.tableName }
             ${ this.generateCreateString() }
             VALUES ?`, [values])
    }

    createOrUpdate(models : OneOrManyObjects)
    {
        let values : StringOrNumber[] | StringOrNumber[][]
        if(Array.isArray(models))
        {
            values = models.map((model)=> {
                return Object.values(this.deconstructModel(model))
            })
        } else {
            let model = models
            values = Object.values(this.deconstructModel(model))
        }

        return this.connection.query(
            `INSERT INTO ${ this.tableName }
             ${ this.generateCreateString() }
             VALUES ?
             ON DUPLICATE KEY
             UPDATE ${ this.generateCreateOrUpdateString() }`, [values])
    }

    update(model : Model)
    {
        let deconstructed = this.deconstructModel(model)

        let values : StringOrNumber[] = []
        Object.keys(deconstructed).forEach((key)=> {
            if(key !== 'id')
            {
                values.push(deconstructed[key])
            }
        })
        values.push(model.id)

        return this.connection.query(
            `UPDATE ${ this.tableName }
             SET ${ this.generateUpdateString() }
             WHERE id = ?`, [values])
    }

    delete(id : StringOrNumber | StringOrNumber[]) : Promise<T>
    {
        return this.connection.query(
            `DELETE
             FROM ${ this.tableName }
             WHERE id = ?`, [id])
    }

    abstract constructModel(row : any) : Object

    abstract deconstructModel(model : Object) : Deconstructed

    constructModels(rows : any)
    {
        return rows.map((row : any)=> {
            return this.constructModel(row)
        })
    }

    generateCreateString()
    {
        return `( ${this.attributes.join(', ') })`
    }

    generateCreateOrUpdateString()
    {
        let attributes : StringOrNumber[] = []
        this.attributes.forEach((attribute)=> {
            if(attribute !== 'id')
            {
                attributes.push( `${ attribute } = VALUES(${ attribute })` )
            }
        })
        return attributes.join(', ')
    }

    generateUpdateString()
    {
        let attributes : StringOrNumber[] = []
        this.attributes.forEach((attribute)=> {
            if(attribute !== 'id')
            {
                attributes.push( `${ attribute } = ?` )
            }
        })
        return attributes.join(', ')
    }

    findId(id : StringOrNumber)
    {
        return this.connection.query(
            `SELECT *
             FROM ${ this.tableName }
             WHERE id = ?`, [id]).then((rows : any)=> {
                return this.constructModels(rows)
             })
    }

    all()
    {
        return this.connection.query(
            `SELECT *
             FROM ${ this.tableName }`).then((rows : any)=> {
                return this.constructModels(rows)
             })
    }
}
