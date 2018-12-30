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

    constructModel(row : any)
    {
        return new Category(
            row.id,
            row.title,
            row.slug,
            row.updated,
            row.created
        )
    }

    deconstructModel(model : Category) : Object
    {
        return {
            id:      model.categoryId,
            title:   model.categoryTitle,
            slug:    model.categorySlug,
            updated: model.categoryUpdated,
            created: model.categoryCreated
        }
    }
}
