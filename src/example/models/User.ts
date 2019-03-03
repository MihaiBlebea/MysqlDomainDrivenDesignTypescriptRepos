import Car from './Car'

export default class User
{
    private id? : number

    private jobId : Number

    private name : String

    private age : Number

    private _cars : Car[] = []

    constructor(jobId: Number, name : String, age : Number, id? : number)
    {
        this.id    = id
        this.jobId = jobId
        this.name  = name
        this.age   = age
    }

    getId()
    {
        return this.id
    }

    getJobId()
    {
        return this.jobId
    }

    getName()
    {
        return this.name
    }

    getAge()
    {
        return this.age
    }

    addCar(car : Car)
    {
        this._cars.push(car)
    }

    addCars(cars : Car[])
    {
        cars.map((car : Car)=> {
            this.addCar(car)
        })
    }

    removeCar(car : Car)
    {
        this._cars.map((_car : Car, index : number)=> {
            if(_car.id === car.id)
            {
                this._cars.splice(index, 2)
            }
        })
    }

    get cars()
    {
        return this._cars
    }
}
