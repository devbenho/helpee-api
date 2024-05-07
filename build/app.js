"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./core/middlewares");
var products_1 = require("./features/products");
var app = (0, express_1.default)();
exports.app = app;
app.use(middlewares_1.corsMiddleware);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api", products_1.router);
