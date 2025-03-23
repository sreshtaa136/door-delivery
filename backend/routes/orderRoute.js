import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
  placeOrderCod,
  createOrder,
  getOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.get("/:oid", getOrder);
orderRouter.get("/user/:uid", authMiddleware, userOrders);
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.post("/status", updateStatus);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);

export default orderRouter;
