import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
const foodRouter = express.Router();

// Multer Middleware (Memory Storage for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
