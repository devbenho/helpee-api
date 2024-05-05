import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, brand TEXT, category TEXT, subcategory TEXT, isBoycott INTEGER, imagePath TEXT)"
  );
});

export { db };
