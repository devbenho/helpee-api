"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDAL = void 0;
const db_1 = require("../../core/db");
class ProductDataAccess {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.db.run("INSERT INTO images (name, brand, category, subcategory , isBoycott, imagePath) VALUES (?, ?, ?, ?, ?, ?)", [
                    product.title,
                    product.brand,
                    product.category,
                    product.subcategory,
                    product.isBoycott,
                    product.imagePath,
                ], (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve("File uploaded and resized successfully.");
                });
            });
        });
    }
    getByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.db.all("SELECT * FROM images WHERE category = ? ", [category], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve(rows);
                });
            });
        });
    }
    getBySubcategory(subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.db.all("SELECT * FROM images WHERE subcategory = ? ", [subcategory], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve(rows);
                });
            });
        });
    }
    getByBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.db.all("SELECT * FROM images WHERE brand = ?", [brand], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve(rows);
                });
            });
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.db.run("UPDATE images SET name = ?, brand = ?, category = ?, subcategory = ?, isBoycott = ?, imagePath = ? WHERE id = ?", [
                    product.title,
                    product.brand,
                    product.category,
                    product.subcategory,
                    product.isBoycott,
                    product.imagePath,
                    id,
                ], (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve(product);
                });
            });
        });
    }
    getSubcategories(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.db.all("SELECT DISTINCT subcategory FROM images WHERE category = ?", [category], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve(rows.map((row) => row.subcategory));
                });
            });
        });
    }
    getAll(category, subcategory, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM images";
                const conditions = [];
                const values = [];
                if (category) {
                    conditions.push("category = ?");
                    values.push(category);
                }
                if (subcategory) {
                    conditions.push("subcategory = ?");
                    values.push(subcategory);
                }
                if (brand) {
                    conditions.push("brand = ?");
                    values.push(brand);
                }
                if (conditions.length !== 0) {
                    query += " WHERE ";
                }
                const whereClause = conditions.join(" AND ");
                db_1.db.all(`${query}${whereClause}`, values, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(new Error("Internal Server Error"));
                    }
                    resolve(rows);
                });
            });
        });
    }
}
exports.ProductDAL = ProductDataAccess;
