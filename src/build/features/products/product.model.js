"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(id, title, description, brand, category, subcategory, isBoycott, imagePath) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.subcategory = subcategory;
        this.isBoycott = isBoycott;
        this.imagePath = imagePath;
    }
    Product.create = function (name, brand, description, category, subcategory, isBoycott, imagePath) {
        return new Product(0, name, description ? description : "", brand, category, subcategory, isBoycott, imagePath);
    };
    return Product;
}());
exports.Product = Product;
