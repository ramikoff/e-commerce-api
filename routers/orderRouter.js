import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.js";
import validateSchema from "../middlewares/validateSchema.js";
import OrderSchema from "../schemas/OrderSchema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(getOrders)
  .post(validateSchema(OrderSchema), createOrder);
orderRouter
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

export default orderRouter;
