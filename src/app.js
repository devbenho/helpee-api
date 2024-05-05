"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./core/middlewares");
const products_1 = require("./features/products");
const app = (0, express_1.default)();
exports.app = app;
app.use(middlewares_1.corsMiddleware);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api", products_1.router);
