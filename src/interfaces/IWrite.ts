import { StringOrNumber, Deconstructed } from './../types'


export interface IWrite<T>
{
    createOne(model : T) : Promise<T>

    createMany(models : T[]) : Promise<T>

    createOrUpdate(models : T | T[]) : Promise<T>

    update(model : T) : Promise<T>

    delete(id : StringOrNumber | StringOrNumber[]) : Promise<T>
}
