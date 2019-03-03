
type StringNumberBoolean = String | Number | Boolean | undefined


export default interface IRead<T>
{
    findId(id : StringNumberBoolean) : Promise<T[]>

    all() : Promise<T[]>
}
