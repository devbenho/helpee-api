import { db } from "../../core/db";
import { Product } from "./product.model";

class ProductDataAccess {
  async create(product: Product): Promise<string> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO images (name, brand, category, subcategory , isBoycott, imagePath) VALUES (?, ?, ?, ?, ?, ?)",
        [
          product.title,
          product.brand,
          product.category,
          product.subcategory,
          product.isBoycott,
          product.imagePath,
        ],
        (err) => {
          if (err) {
            console.error(err.message);
            reject(new Error("Internal Server Error"));
          }
          resolve("File uploaded and resized successfully.");
        }
      );
    });
  }

  async getByCategory(category: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM images WHERE category = ? ",
        [category],
        (err, rows) => {
          if (err) {
            console.error(err.message);
            reject(new Error("Internal Server Error"));
          }
          resolve(rows as Product[]);
        }
      );
    });
  }

  async getBySubcategory(subcategory: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM images WHERE subcategory = ? ",
        [subcategory],
        (err, rows) => {
          if (err) {
            console.error(err.message);
            reject(new Error("Internal Server Error"));
          }
          resolve(rows as Product[]);
        }
      );
    });
  }

  async getByBrand(brand: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM images WHERE brand = ?", [brand], (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(new Error("Internal Server Error"));
        }
        resolve(rows as Product[]);
      });
    });
  }

  async update(id: number, product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE images SET name = ?, brand = ?, category = ?, subcategory = ?, isBoycott = ?, imagePath = ? WHERE id = ?",
        [
          product.title,
          product.brand,
          product.category,
          product.subcategory,
          product.isBoycott,
          product.imagePath,
          id,
        ],
        (err) => {
          if (err) {
            console.error(err.message);
            reject(new Error("Internal Server Error"));
          }
          resolve(product);
        }
      );
    });
  }
  async getSubcategories(category: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT DISTINCT subcategory FROM images WHERE category = ?",
        [category],
        (err, rows) => {
          if (err) {
            console.error(err.message);
            reject(new Error("Internal Server Error"));
          }
          resolve(rows.map((row: any) => row.subcategory));
        }
      );
    });
  }
  async getAll(
    category?: string,
    subcategory?: string,
    brand?: string
  ): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM images";
      const conditions: string[] = [];
      const values: string[] = [];
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
      db.all(`${query}${whereClause}`, values, (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(new Error("Internal Server Error"));
        }
        resolve(rows as Product[]);
      });
    });
  }
}

export { ProductDataAccess as ProductDAL };
