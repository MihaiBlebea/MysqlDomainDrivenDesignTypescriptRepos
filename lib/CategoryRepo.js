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
    constructModel(row) {
        return new Category_1.Category(row.id, row.title, row.slug, row.updated, row.created);
    }
    deconstructModel(model) {
        return {
            id: model.categoryId,
            title: model.categoryTitle,
            slug: model.categorySlug,
            updated: model.categoryUpdated,
            created: model.categoryCreated
        };
    }
}
exports.CategoryRepo = CategoryRepo;
