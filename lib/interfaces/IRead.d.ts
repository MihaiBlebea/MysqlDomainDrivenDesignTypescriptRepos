import { StringOrNumber } from './../types';
export interface IRead<T> {
    findId(id: StringOrNumber): Promise<T[]>;
    all(): Promise<T[]>;
}
