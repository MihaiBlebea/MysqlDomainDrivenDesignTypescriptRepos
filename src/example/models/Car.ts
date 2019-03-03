export default class Car
{
    private _brand : string

    private _doors : number

    private _price : number

    private _userId : number

    private _id? : number


    constructor(brand : string, doors : number, price : number, userId : number, id? : number)
    {
        this._brand  = brand
        this._doors  = doors
        this._price  = price
        this._userId = userId
        this._id     = id
    }

    get id()
    {
        return this._id
    }

    get userId()
    {
        return this._userId
    }

    get brand()
    {
        return this._brand
    }

    get doors()
    {
        return this._doors
    }

    get price()
    {
        return this._price
    }
}
