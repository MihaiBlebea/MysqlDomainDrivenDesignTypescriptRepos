import { UserRepository } from './UserRepository'
import { User } from './models'
import { MysqlConnection } from './../MysqlConnection'


let connection = new MysqlConnection('127.0.0.1', 'playground', 'admin', 'root', 32776)
let repository = new UserRepository(connection)

let mihai = new User('Mihai', 29)


// repository.createOne(mihai).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })

// repository.findName('Mihai').then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })

// repository.findNameAndAge('Mihai', 29).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })

repository.deleteAll().then((result : any)=> {
    console.log(result)
}).catch((error : Error)=> {
    console.log(error)
})
