import { BaseRepository } from './../BaseRepository'
import { User } from './models'
import { IMysqlConnection } from './../interfaces'


type UserDeconstructed = {
    job_id: Number,
    name: String,
    age: Number
}


export class UserRepository<T> extends BaseRepository<T>
{
    attributes : String[] = ['job_id', 'name', 'age']


    constructor(connection : IMysqlConnection)
    {
        super(connection, 'users')
    }

    constructModel(row : any)
    {
        return new User(row.job_id, row.name, row.age, row.id)
    }

    deconstructModel(model : User) : UserDeconstructed
    {
        return {
            job_id: model.getJobId(),
            name: model.getName(),
            age: model.getAge()
        }
    }

    findName(name : String)
    {
        return this.connection.query(
            `SELECT *
             FROM ${ this.table }
             WHERE name = ?`, [name]).then((rows : any)=> {
                 console.log(rows)
                 return this.constructModels(rows)
             })
    }

    findAge(age : Number)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE age = ?`, [age]).then((result : any)=> {
            return result
        })
    }

    findNameAndAge(name : String, age : Number)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE name = ?
             AND age = ?`, [name, age]).then((result : any)=> {
            return result
        })
    }

    deleteAll()
    {
        return this.query(`DELETE FROM ${ this.table }`)
    }
}
