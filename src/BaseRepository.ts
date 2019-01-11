import { IMysqlConnection, IRead, IWrite } from './interfaces'
import { StringOrNumber, Deconstructed } from './types'



export abstract class BaseRepository<T> implements IRead<T>, IWrite<T>
{
    protected connection : any

    abstract attributes : String[]

    protected tableName : String


    constructor(connection : IMysqlConnection, tableName : String)
    {
        this.connection = connection
        this.tableName  = tableName
    }

    query(query : String, values? : any) : Promise<T[]>
    {
        return this.connection.query(query, values).then((rows : any)=> {
            if(Array.isArray(rows))
            {
                return this.constructModels(rows)
            }
            return rows
        })
    }

    get table()
    {
        return this.tableName
    }

    createOne(model : T)
    {
        let deconstructed = this.deconstructModel(model)
        let values = Object.values(deconstructed)

        return this.create(values)
    }

    createMany(models : T[])
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
             VALUES (?)`, [values])
    }

    createOrUpdate(models : T | T[])
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

    update(model : T)
    {
        let deconstructed = this.deconstructModel(model)

        let values : StringOrNumber[] = []
        Object.keys(deconstructed).forEach((key)=> {
            if(key !== 'id')
            {
                values.push(deconstructed[key])
            }
        })
        values.push(deconstructed.id)

        return this.connection.query(
            `UPDATE ${ this.tableName }
             SET ${ this.generateUpdateString() }
             WHERE id = ?`, [values])
    }

    delete(id : StringOrNumber | StringOrNumber[])
    {
        return this.connection.query(
            `DELETE
             FROM ${ this.tableName }
             WHERE id = ?`, [id])
    }

    abstract constructModel(row : {}) : T

    abstract deconstructModel(model : T) : Deconstructed

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

    findId(id : StringOrNumber) : Promise<T[]>
    {
        return this.connection.query(
            `SELECT *
             FROM ${ this.tableName }
             WHERE id = ?`, [id]).then((rows : any)=> {
                return this.constructModels(rows)
             })
    }

    all() : Promise<T[]>
    {
        return this.connection.query(
            `SELECT *
             FROM ${ this.tableName }`).then((rows : any)=> {
                return this.constructModels(rows)
             })
    }
}
