"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repo_1 = require("./Repo");
const Category_1 = require("./Category");
class CategoryRepo extends Repo_1.Repo {
    constructor(conn) {
        super(conn);
        this.attributes = ['id', 'title', 'slug', 'updated', 'created'];
        this.tableName = 'categories';
    }
    createModel(row) {
        return new Category_1.Category(row.id, row.title, row.slug, row.updated, row.created);
    }
}
exports.CategoryRepo = CategoryRepo;
