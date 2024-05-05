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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const products_dal_1 = require("./products.dal");
const product_model_1 = require("./product.model");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
class ProductController {
    constructor() {
        this.productDAL = new products_dal_1.ProductDAL();
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const imagePath = req.file.path;
            try {
                const { name, brand, category, subcategory, isBoycott } = req.body;
                // Parse original filename and extension
                const { ext, name: fileName } = path_1.default.parse(imagePath);
                const resizedImagePath = `${fileName}-resized${ext}`;
                yield (0, sharp_1.default)(imagePath)
                    .resize({ width: 800 }) // Set the desired width (you can adjust this value as needed)
                    .toFile(`uploads/${resizedImagePath}`); // Save resized image in uploads directory
                const newProduct = product_model_1.Product.create(name, brand, "", category, subcategory, isBoycott, "uploads/" + resizedImagePath);
                yield this.productDAL.create(newProduct);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
        this.getProducts = (req, res) => {
            // FILTER
            const { category, subcategory, brand } = req.query;
            this.productDAL
                .getAll(category, subcategory, brand)
                .then((products) => {
                return res.json(products);
            });
        };
        this.getSubcategories = (req, res) => {
            const { category } = req.query;
            this.productDAL
                .getSubcategories(category)
                .then((subcategories) => {
                return res.json(subcategories);
            });
        };
    }
    static CreateInstance() {
        return new ProductController();
    }
}
exports.ProductController = ProductController;
