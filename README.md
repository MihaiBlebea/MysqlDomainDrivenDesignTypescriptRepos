## Mysql DDD Typescript BaseRepository Pattern

### Install:

- With NPM  ``` npm install mysql-ts-repo-design ```

### Usage:

- Create a new specific repository for every entity:

```
import { BaseRepository, IMysqlConnection } from 'mysql-ts-repo-design'


type UserDeconstructed = {
    name : string,
    email : string,
    password : string
}


export class UserRepository extends BaseRepository
{
    attributes : String[] = ['name', 'email', 'password'] // Specify the rows in the database table

    constructor(connection : IMysqlConnection)
    {
        super(connection, 'users') // 'users' is the name of the database table for this entity
    }

    // Must implement this abstract method when extending BaseRepository
    constructModel(row : any): Object
    {
        // Use a factory pattern or just init the model object with data from database
        return new User(row.name, row.email, row.password, row.id)
    }

    // Must implement this abstract method when extending BaseRepository
    deconstructModel(model: User) : UserDeconstructed
    {
        // Deconstruct the entity mapping the attributes to rows in the database
        return {
            name:     model.getName(),
            email:    model.getEmail(),
            password: model.getPassword()
        }
    }
}
```

- Use the new repository in your code:

```
import { MysqlConnection } from './../MysqlConnection'
import { UserRepository } from './path-to-repository-folder'
import { User } from './path-to-entity-folder'

let connection = new MysqlConnection('host', 'database', 'username', 'password')
let userRepo = new UserRepository(connection)

let bob = new User('Bob', 'bob@example.com', 'bobthecop')

userRepo.createOne(bob).then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})

userRepo.findName('Bob').then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})

```


### Options that can be supplied to the object

- Log the final sql query for debug. You can add a env variable to trigger this depending on the DEV / PROD env:

```
let connection = new MysqlConnection('127.0.0.1', 'database_name', 'admin', 'root', 3306)
connection.setup({
    showQuery: true
})
```

### Methods you can use from the BaseRepository

#### Write API:

- **createOne(model)** // Creates a database entry from a Model

- **createMany(models)** // Creates database entries for a list of Models

- **createOrUpdate(models)** // Create or update a model or a list of models. It will create if the id is not present in the database table, otherwise update the model with that id

- **update(model)** // Update a model in the database based on it's id.

- **delete(id)** // Delete a model from database based on it's id.


#### Read API:

- **findId(id)** // Find an entry with the specified id. It will return a promise with an array of models

- **all()** // Return an array with all the models in the database table


### Create your own methods on the class that extends the BaseRepository

```
export class UserRepository extends BaseRepository
{
    // All the methods that implement the abstract BaseRepository class

    // Your own methods
    findName(name : string)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE name = ?`, [ name ])
    }

    findEmail(email : string)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE email = ?`, [ email ])
    }

    findEmailAndName(email : string, name : string)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE email = ?
             AND name = ?`, [ email, name ])
    }
}

```

### Inspiration for this repo from:

- Article: https://hackernoon.com/generic-repository-with-typescript-and-node-js-731c10a1b98e

- Github: https://github.com/ErickWendel/generic-repository-nodejs-typescript-article
