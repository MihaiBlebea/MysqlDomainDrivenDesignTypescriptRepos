import { UserRepository } from './UserRepository'
import { JobRepository } from './JobRepository'
import { User, Job } from './models'
import { MysqlConnection } from './../MysqlConnection'


let connection = new MysqlConnection('127.0.0.1', 'playground', 'admin', 'root', 32776)
let userRepo = new UserRepository(connection)
let jobRepo  = new JobRepository(connection)

let developer = new Job('developer', 38000)
let mihai = new User(1, 'Mihai', 29)

// jobRepo.createOne(developer).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })

// userRepo.createOne(mihai).then((result : any)=> {
//     console.log(result)
// }).catch((error : Error)=> {
//     console.log(error)
// })
