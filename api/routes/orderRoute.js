import express from "express";
import {
  confirm,
  getOrders,
  intent,
  createCheckoutSession,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/jwt.js";

const orderRouter = express.Router();

orderRouter.get("/", verifyToken, getOrders);

orderRouter.post(
  "/checkout/:id",
  verifyToken,
  createCheckoutSession
);

orderRouter.put("/", verifyToken, confirm);

export default orderRouter;