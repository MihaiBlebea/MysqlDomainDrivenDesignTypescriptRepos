import { Repo } from './Repo';
import { Category } from './Category';
export declare class CategoryRepo extends Repo {
    attributes: string[];
    tableName: string;
    constructor(conn: any);
    constructModel(row: any): Category;
    deconstructModel(model: Category): Object;
}
