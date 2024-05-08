import { Router } from "express";
import { upload } from "../../core/files/file.configuration";
import { ProductController } from "./products.controller";

const router = Router();

const productController = ProductController.CreateInstance();

router.use(upload.single("image"));

router.get("/products", productController.getProducts);

router.delete("/products/:id", productController.deleteProduct);
router.get("/subcategories", productController.getSubcategories);

router.post("/uploads", productController.createProduct);

export { router };

// generate command curl to delete a product
// curl -X DELETE http://localhost:3000/api/products/1
