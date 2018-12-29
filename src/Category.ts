
export class Category
{
    private id : String

    private title : String

    private slug : String

    private updated : String

    private created : String

    constructor(
        id : String,
        title : String,
        slug : String,
        updated : String,
        created : String)
    {
        this.id      = id
        this.title   = title
        this.slug    = slug
        this.updated = updated
        this.created = created
    }

    get categoryId() : String
    {
        return this.id
    }

    get categoryTitle() : String
    {
        return this.title
    }

    get categorySlug() : String
    {
        return this.slug
    }

    get categoryUpdated() : String
    {
        return this.updated
    }

    get categoryCreated() : String
    {
        return this.created
    }

    set categoryId(value : String)
    {
        this.id = value
    }

    set categoryTitle(value : String)
    {
        this.title = value
    }

    set categorySlug(value : String)
    {
        this.slug = value
    }

    set categoryUpdated(value : String)
    {
        this.updated = value
    }

    set categoryCreated(value : String)
    {
        this.created = value
    }
}
