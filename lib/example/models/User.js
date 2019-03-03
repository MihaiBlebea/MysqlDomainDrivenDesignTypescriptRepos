"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(jobId, name, age, id) {
        this._cars = [];
        this.id = id;
        this.jobId = jobId;
        this.name = name;
        this.age = age;
    }
    getId() {
        return this.id;
    }
    getJobId() {
        return this.jobId;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    addCar(car) {
        this._cars.push(car);
    }
    addCars(cars) {
        cars.map((car) => {
            this.addCar(car);
        });
    }
    removeCar(car) {
        this._cars.map((_car, index) => {
            if (_car.id === car.id) {
                this._cars.splice(index, 2);
            }
        });
    }
    get cars() {
        return this._cars;
    }
}
exports.default = User;
