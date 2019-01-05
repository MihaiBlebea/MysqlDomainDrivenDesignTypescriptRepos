import { BaseRepository } from './../BaseRepository'
import { IMysqlConnection } from './../interfaces'
import { Job } from './models'


type JobDeconstructed = {
    title : String,
    job : Number
}

export class JobRepository<T> extends BaseRepository<T>
{
    attributes : String[] = ['title', 'salary']

    constructor(connection : IMysqlConnection)
    {
        super(connection, 'jobs')
    }

    constructModel(row : any): Object
    {
        return new Job(row.title, row.salary, row.id)
    }

    deconstructModel(model: Job)
    {
        return {
            title: model.getTitle(),
            salary: model.getSalary()
        }
    }
}
