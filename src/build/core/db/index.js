"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var sqlite3_1 = __importDefault(require("sqlite3"));
var db = new sqlite3_1.default.Database("database.db");
exports.db = db;
db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, brand TEXT, category TEXT, subcategory TEXT, isBoycott INTEGER, imagePath TEXT)");
});
