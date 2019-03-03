export default class Car {
    private _brand;
    private _doors;
    private _price;
    private _userId;
    private _id?;
    constructor(brand: string, doors: number, price: number, userId: number, id?: number);
    readonly id: number | undefined;
    readonly userId: number;
    readonly brand: string;
    readonly doors: number;
    readonly price: number;
}
