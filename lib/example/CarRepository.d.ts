import BaseRepository from './../BaseRepository';
import { Car } from './models';
import { PoolConnection, Connection } from 'mysql';
export default class CarRepository extends BaseRepository<Car> {
    attributes: String[];
    constructor(connection: PoolConnection | Connection);
    constructModel(row: any): Car;
    deconstructModel(model: Car): {
        userId: number;
        brand: string;
        doors: number;
        price: number;
    };
    findUserId(id: number): Promise<Car[]>;
    createFoo(model: Car): void;
}
