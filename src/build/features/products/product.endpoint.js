"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var file_configuration_1 = require("../../core/files/file.configuration");
var products_controller_1 = require("./products.controller");
var router = (0, express_1.Router)();
exports.router = router;
var productController = products_controller_1.ProductController.CreateInstance();
router.use(file_configuration_1.upload.single("image"));
router.get("/products", productController.getProducts);
router.delete("/products/:id", productController.deleteProduct);
router.get("/subcategories", productController.getSubcategories);
router.post("/uploads", productController.createProduct);
// generate command curl to delete a product
// curl -X DELETE http://localhost:3000/api/products/1
