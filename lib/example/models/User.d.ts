import Car from './Car';
export default class User {
    private id?;
    private jobId;
    private name;
    private age;
    private _cars;
    constructor(jobId: Number, name: String, age: Number, id?: number);
    getId(): number | undefined;
    getJobId(): Number;
    getName(): String;
    getAge(): Number;
    addCar(car: Car): void;
    addCars(cars: Car[]): void;
    removeCar(car: Car): void;
    readonly cars: Car[];
}
