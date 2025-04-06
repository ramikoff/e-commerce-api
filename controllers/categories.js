import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new ErrorResponse("Category not found", 404);
  }

  res.json({
    id: category.id,
    name: category.name,
  });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  if (!category) throw new ErrorResponse("Category not found", 404);
  await category.update(req.body);
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) throw new ErrorResponse("Category not found", 404);
  await category.destroy();
  res.json({ message: "Category deleted successfully" });
};
