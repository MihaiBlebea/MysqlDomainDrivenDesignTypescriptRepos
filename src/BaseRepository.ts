import { PoolConnection, Connection } from 'mysql'
import { IRead, IWrite } from './interfaces'
import Query from './Query'


type StringNumberBoolean = String | Number | Boolean | undefined

type DeconstructedModel = { [ key : string ] : any }



export default abstract class BaseRepository<T> implements IRead<T>, IWrite<T>
{
    protected connection : PoolConnection | Connection

    abstract attributes : String[]

    protected tableName : String


    constructor(connection : PoolConnection | Connection, tableName : String)
    {
        this.connection = connection
        this.tableName  = tableName
    }

    async query(query : string, values? : any) : Promise<T[]>
    {
        let rows = await Query.execute(query, values, this.connection, { logQuery : true })

        if(Array.isArray(rows))
        {
            return this.constructModels(rows)
        }
        return rows
    }

    get table()
    {
        return this.tableName
    }

    createOne(model : T)
    {
        let deconstructed = this.deconstructModel(model)
        let values : StringNumberBoolean[] = []
        Object.keys(deconstructed).forEach((key)=> {
            if(key !== 'id')
            {
                values.push(deconstructed[key])
            }
        })

        return this.create([values])
    }

    createMany(models : T[])
    {
        let values = models.map((model)=> {
            return Object.values(this.deconstructModel(model))
        })

        return this.create(values)
    }

    protected create(values : StringNumberBoolean[] | StringNumberBoolean[][])
    {
        return Query.execute(
            `INSERT INTO ${ this.tableName }
             ${ this.generateCreateString() }
             VALUES ?`, [values], this.connection)
    }

    createOrUpdate(models : T | T[])
    {
        let values : StringNumberBoolean[] | StringNumberBoolean[][]
        if(Array.isArray(models))
        {
            values = models.map((model)=> {
                return Object.values(this.deconstructModel(model))
            })
        } else {
            let model = models
            values = Object.values(this.deconstructModel(model))
        }

        return Query.execute(
            `INSERT INTO ${ this.tableName }
             ${ this.generateCreateString() }
             VALUES ?
             ON DUPLICATE KEY
             UPDATE ${ this.generateCreateOrUpdateString() }`, [values], this.connection)
    }

    update(model : T)
    {
        let deconstructed = this.deconstructModel(model)

        let values : StringNumberBoolean[] = []
        Object.keys(deconstructed).forEach((key)=> {
            if(key !== 'id')
            {
                values.push(deconstructed[key])
            }
        })
        values.push(deconstructed.id)

        return Query.execute(
            `UPDATE ${ this.tableName }
             SET ${ this.generateUpdateString() }
             WHERE id = ?`, [values], this.connection)
    }

    delete(id : StringNumberBoolean | StringNumberBoolean[])
    {
        return Query.execute(
            `DELETE
             FROM ${ this.tableName }
             WHERE id = ?`, [id], this.connection)
    }

    abstract constructModel(row : DeconstructedModel) : T

    abstract deconstructModel(model : T) : { [key : string] : StringNumberBoolean }

    constructModels(rows : DeconstructedModel)
    {
        return rows.map((row : any)=> {
            return this.constructModel(row)
        })
    }

    generateCreateString()
    {
        let attributes = this.attributes.filter((attribute)=> {
            return attribute !== 'id'
        })
        return `(${ attributes.join(', ') })`
    }

    generateCreateOrUpdateString()
    {
        let attributes : StringNumberBoolean[] = []
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
        let attributes : StringNumberBoolean[] = []
        this.attributes.forEach((attribute)=> {
            if(attribute !== 'id')
            {
                attributes.push( `${ attribute } = ?` )
            }
        })
        return attributes.join(', ')
    }

    findId(id : string | number) : Promise<T[]>
    {
        return this.query(
                    `SELECT *
                     FROM ${ this.tableName }
                     WHERE id = ?`, [ id ])
    }

    all() : Promise<T[]>
    {
        return this.query(`SELECT * FROM ${ this.tableName }`)

    }
}
