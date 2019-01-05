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
        return new User(row.name, row.age)
    }

    deconstructModel(model : User) : UserDeconstructed
    {
        return {
            name: model.getName(),
            age: model.getAge()
        }
    }
}
