import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "../controllers/categories.js";
import validateSchema from "../middlewares/validateSchema.js";
import CategorySchema from "../schemas/CategorySchema.js";
import categoryExists from "../middlewares/categoryExists.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(getCategories)
  .post(validateSchema(CategorySchema), categoryExists, createCategory);
categoryRouter
  .route("/:id")
  .get(getCategoryById)
  .put(validateSchema(CategorySchema), updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
