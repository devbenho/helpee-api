// allow using
import { Request, Response } from "express";
import { ProductDAL } from "./products.dal";
import { Product } from "./product.model";
import sharp from "sharp";
import path from "path";

class ProductController {
  private readonly productDAL: ProductDAL = new ProductDAL();
  createProduct = async (req: Request, res: Response) => {
    const imagePath = (req.file as Express.Multer.File).path;
    try {
      const { name, brand, category, subcategory, isBoycott } = req.body;

      // Parse original filename and extension
      const { ext, name: fileName } = path.parse(imagePath);
      const resizedImagePath = `${fileName}-resized${ext}`;

      await sharp(imagePath)
        .resize({ width: 800 }) // Set the desired width (you can adjust this value as needed)
        .toFile(`uploads/${resizedImagePath}`); // Save resized image in uploads directory

      const newProduct = Product.create(
        name,
        brand,
        "",
        category,
        subcategory,
        isBoycott,
        "uploads/" + resizedImagePath
      );
      await this.productDAL.create(newProduct);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getProducts = (req: Request, res: Response) => {
    // FILTER
    const { category, subcategory, brand } = req.query;
    this.productDAL
      .getAll(category as string, subcategory as string, brand as string)
      .then((products) => {
        return res.json(products);
      });
  };

  getSubcategories = (req: Request, res: Response) => {
    const { category } = req.query;
    this.productDAL
      .getSubcategories(category as string)
      .then((subcategories) => {
        return res.json(subcategories);
      });
  };
  deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    this.productDAL.delete(id).then(() => {
      return res.json({ message: "Product deleted" });
    });
  };
  public static CreateInstance(): ProductController {
    return new ProductController();
  }
}

export { ProductController };
