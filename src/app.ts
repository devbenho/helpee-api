import express from "express";
import { corsMiddleware } from "./core/middlewares";
import { router } from "./features/products";

const app = express();

app.use(corsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/api", router);

export { app };
