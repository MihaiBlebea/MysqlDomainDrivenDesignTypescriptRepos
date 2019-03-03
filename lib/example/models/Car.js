"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    constructor(brand, doors, price, userId, id) {
        this._brand = brand;
        this._doors = doors;
        this._price = price;
        this._userId = userId;
        this._id = id;
    }
    get id() {
        return this._id;
    }
    get userId() {
        return this._userId;
    }
    get brand() {
        return this._brand;
    }
    get doors() {
        return this._doors;
    }
    get price() {
        return this._price;
    }
}
exports.default = Car;
