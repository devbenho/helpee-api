"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const file_configuration_1 = require("../../core/files/file.configuration");
const products_controller_1 = require("./products.controller");
const router = (0, express_1.Router)();
exports.router = router;
const productController = products_controller_1.ProductController.CreateInstance();
router.use(file_configuration_1.upload.single("image"));
router.get("/products", productController.getProducts);
router.get("/subcategories", productController.getSubcategories);
router.post("/uploads", productController.createProduct);