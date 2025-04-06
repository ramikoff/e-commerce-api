import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.js";
import validateSchema from "../middlewares/validateSchema.js";
import ProductSchema from "../schemas/ProductSchema.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(validateSchema(ProductSchema), createProduct);
productRouter.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

export default productRouter;
