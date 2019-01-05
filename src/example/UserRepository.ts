import { BaseRepository } from './../BaseRepository'
import { User } from './models/User'
import { IMysqlConnection } from './../interfaces'


type UserDeconstructed = {
    name: String,
    age: Number
}


export class UserRepository extends BaseRepository<User>
{
    attributes : String[] = ['name', 'age']


    constructor(connection : IMysqlConnection)
    {
        super(connection, 'users')
    }

    constructModel(row : any)
    {
        return new User(row.name, row.age, row.id)
    }

    deconstructModel(model : User) : UserDeconstructed
    {
        return {
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
