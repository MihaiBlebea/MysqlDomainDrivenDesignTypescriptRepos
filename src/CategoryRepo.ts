import { Repo } from './Repo'
import { Category } from './Category'


export class CategoryRepo extends Repo
{
    attributes = ['id', 'title', 'slug', 'updated', 'created']

    tableName : string = 'categories'

    constructor(conn : any)
    {
        super(conn)
    }

    createModel(row : any)
    {
        return new Category(
            row.id,
            row.title,
            row.slug,
            row.updated,
            row.created
        )
    }
}
