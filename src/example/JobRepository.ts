import { BaseRepository } from './../BaseRepository'
import { IMysqlConnection } from './../interfaces'
import { Job } from './models'
import { Deconstructed } from './../types'

// type JobDeconstructed = {
//     title : String,
//     salary: Number,
//     id : Number
// }

export class JobRepository extends BaseRepository<Job>
{
    attributes : String[] = ['title', 'salary']

    constructor(connection : IMysqlConnection)
    {
        super(connection, 'jobs')
    }

    constructModel(row : Deconstructed)
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
