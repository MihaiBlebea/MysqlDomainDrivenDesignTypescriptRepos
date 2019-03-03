import { BaseRepository } from './../BaseRepository'
import { IMysqlConnection } from './../interfaces'
import { Job } from './models'
import { PoolConnection, Connection } from 'mysql'


export default class JobRepository extends BaseRepository<Job>
{
    attributes : String[] = ['title', 'salary']

    constructor(connection : PoolConnection | Connection)
    {
        super(connection, 'jobs')
    }

    constructModel(row : any)
    {
        return new Job(row.title, row.salary, row.id)
    }

    deconstructModel(model : Job)
    {
        return {
            title: model.getTitle(),
            salary: model.getSalary(),
            id: model.getId()
        }
    }
}
