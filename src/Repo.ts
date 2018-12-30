import { MysqlInterface } from './MysqlInterface'
import * as uuid from 'uuid/v1'


export abstract class Repo
{
    protected conn : any

    protected items : any[] = []

    abstract attributes : any[] = []

    abstract tableName : string


    constructor(conn : MysqlInterface)
    {
        this.conn = conn
    }

    nextId()
    {
        return uuid()
    }

    add(item : any)
    {
        this.items.push(item)
    }

    addAll(items : [] = [])
    {
        items.map((item)=> {
            this.add(item)
        })
    }

    remove(item : any)
    {
        return this.conn.query(
            `DELETE
             FROM ${ this.tableName }
             WHERE id = ?`, [item.id])
    }

    removeAll(items : [] = [])
    {
        let ids = items.map((item : any)=> {
            return [item.id]
        })

        return this.conn.query(
            `DELETE
             FROM ${ this.tableName }
             WHERE id IN (?)`, [ids])
    }

    flush()
    {
        return this.insertOrUpdateItems().then((result : any)=> {
            this.items = []
            return result
        })
    }

    protected constructModels(rows : any)
    {
        return rows.map((row : any)=> {
            return this.constructModel(row)
        })
    }

    abstract constructModel(row : any) : any

    abstract deconstructModel(model : Object) : Object

    protected generateAttributeString()
    {
        return `( ${this.attributes.join(', ') })`
    }

    protected generateUpdateAttributeString()
    {
        let attributes : any[] = []
        this.attributes.forEach((attribute)=> {
            if(attribute !== 'id')
            {
                attributes.push( `${ attribute } = VALUES(${ attribute })` )
            }
        })
        return attributes.join(', ')
    }

    protected insertItems()
    {
        let items = this.items.map((item)=> {
            return Object.values(item)
        })

        return this.conn.query(
            `INSERT INTO ${ this.tableName }
             ${ this.generateAttributeString() }
             VALUES ?`, [items])
    }

    protected insertOrUpdateItems()
    {
        let items = this.items.map((item)=> {
            let mappedObject = this.deconstructModel(item)
            return Object.values(mappedObject)
        })

        return this.conn.query(
            `INSERT INTO ${ this.tableName }
             ${ this.generateAttributeString() }
             VALUES ?
             ON DUPLICATE KEY
             UPDATE ${ this.generateUpdateAttributeString() }`, [items])
    }

    withId(id : String)
    {
        return this.conn.query(
            `SELECT *
             FROM ${ this.tableName }
             WHERE id = ?`, [id]).then((rows : any)=> {
                return this.constructModels(rows)
             })
    }

    all()
    {
        return this.conn.query(
            `SELECT *
             FROM ${ this.tableName }`).then((rows : any)=> {
                return this.constructModels(rows)
             })
    }
}
