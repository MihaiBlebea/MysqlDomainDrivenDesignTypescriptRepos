import { BaseRepository } from './../BaseRepository'
import { User } from './models'
import { IMysqlConnection } from './../interfaces'
import { PoolConnection, Connection } from 'mysql'



export default class UserRepository extends BaseRepository<User>
{
    attributes : String[] = ['job_id', 'name', 'age']


    constructor(connection : PoolConnection | Connection)
    {
        super(connection, 'users')
    }

    constructModel(row : any)
    {
        return new User(row.job_id, row.name, row.age, row.id)
    }

    deconstructModel(model : User)
    {
        return {
            id: model.getId(),
            job_id: model.getJobId(),
            name: model.getName(),
            age: model.getAge()
        }
    }

    findName(name : String)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE name = ?`, [name])
    }

    findAge(age : Number)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE age = ?`, [age])
    }

    findNameAndAge(name : String, age : Number)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE name = ?
             AND age = ?`, [name, age])
    }

    deleteAll()
    {
        return this.query(`DELETE FROM ${ this.table }`)
    }
}
