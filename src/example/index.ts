import { UserRepository } from './UserRepository'
import { JobRepository } from './JobRepository'
import { User, Job } from './models'
import { MysqlConnection } from './../MysqlConnection'


let connection = new MysqlConnection('127.0.0.1', 'playground_database', 'admin', 'root', 32800)
connection.setup({
    showQuery: true
})

let userRepo = new UserRepository(connection)
let jobRepo  = new JobRepository(connection)

// let developer = new Job('developer', 38000)
// let mihai = new User(1, 'Mihai', 29)

jobRepo.findId(1).then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})
