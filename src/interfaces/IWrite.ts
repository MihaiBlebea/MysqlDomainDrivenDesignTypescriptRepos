import { StringOrNumber, Model, OneOrManyObjects, Deconstructed } from './../types'


export interface IWrite<T>
{
    createOne(model : Model) : Promise<T>

    createMany(models : Model[]) : Promise<T>

    createOrUpdate(models : OneOrManyObjects) : Promise<T>

    update(model : Model) : Promise<T>

    delete(id : StringOrNumber | StringOrNumber[]) : Promise<T>
}
