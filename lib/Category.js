"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor(id, title, slug, updated, created) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.updated = updated;
        this.created = created;
    }
    get categoryId() {
        return this.id;
    }
    get categoryTitle() {
        return this.title;
    }
    get categorySlug() {
        return this.slug;
    }
    get categoryUpdated() {
        return this.updated;
    }
    get categoryCreated() {
        return this.created;
    }
    set categoryId(value) {
        this.id = value;
    }
    set categoryTitle(value) {
        this.title = value;
    }
    set categorySlug(value) {
        this.slug = value;
    }
    set categoryUpdated(value) {
        this.updated = value;
    }
    set categoryCreated(value) {
        this.created = value;
    }
}
exports.Category = Category;
