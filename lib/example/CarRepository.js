"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("./../BaseRepository");
const models_1 = require("./models");
class CarRepository extends BaseRepository_1.default {
    constructor(connection) {
        super(connection, 'cars');
        this.attributes = ['user_id', 'brand', 'doors', 'price'];
    }
    constructModel(row) {
        console.log(row);
        return new models_1.Car(row.brand, row.doors, row.price, row.id);
    }
    deconstructModel(model) {
        return {
            // id: model.id,
            userId: model.userId,
            brand: model.brand,
            doors: model.doors,
            price: model.price
        };
    }
    findUserId(id) {
        return this.query(`SELECT *
             FROM ${this.table}
             WHERE user_id = ?`, [id]);
    }
}
exports.default = CarRepository;
