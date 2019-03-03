import BaseRepository from './../BaseRepository'
import { Car } from './models'
import { PoolConnection, Connection } from 'mysql'



export default class CarRepository extends BaseRepository<Car>
{
    attributes : String[] = ['user_id', 'brand', 'doors', 'price']


    constructor(connection : PoolConnection | Connection)
    {
        super(connection, 'cars')
    }

    constructModel(row : any)
    {
        console.log(row)
        return new Car(row.brand, row.doors, row.price, row.id)
    }

    deconstructModel(model : Car)
    {
        return {
            // id: model.id,
            userId: model.userId,
            brand: model.brand,
            doors: model.doors,
            price: model.price
        }
    }

    findUserId(id : number)
    {
        return this.query(
            `SELECT *
             FROM ${ this.table }
             WHERE user_id = ?`, [ id ])
    }
}
