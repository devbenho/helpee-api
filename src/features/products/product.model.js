"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, title, description, brand, category, subcategory, isBoycott, imagePath) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.subcategory = subcategory;
        this.isBoycott = isBoycott;
        this.imagePath = imagePath;
    }
    static create(name, brand, description, category, subcategory, isBoycott, imagePath) {
        return new Product(0, name, description ? description : "", brand, category, subcategory, isBoycott, imagePath);
    }
}
exports.Product = Product;
