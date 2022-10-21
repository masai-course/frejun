import express from "express";
import dotenv from "dotenv";
// Controllers
import BlogController from "./controllers/blog.controller.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();
app.use("/", BlogController);

export default app;