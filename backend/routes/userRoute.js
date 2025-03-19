import express from "express";
import {
  getProfile,
  loginUser,
  logOut,
  registerUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.post("/logout", logOut);

export default userRouter;
