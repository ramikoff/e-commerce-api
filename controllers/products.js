import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getProducts = async (req, res) => {
  const { categoryId } = req.query;

  const filter = categoryId ? { categoryId } : {};

  const products = await Product.findAll({
    where: filter,
    include: { model: Category, as: "category" },
  });

  res.json(products);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  const category = await product.getCategory;
  product.dataValues.category = category;
  res.status(201).json(product);
};

export const getProductById = async (req, res) => {
  // console.log("Request params:", req.params);
  // console.log("Request body:", req.body);
  const { id } = req.params;
  const product = await Product.findByPk(id, { include: Category });
  if (!product) throw new ErrorResponse("Product not found", 404);
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) throw new ErrorResponse("Product not found", 404);
  await product.update(req.body);
  const category = await product.getCategory();
  product.dataValues.category = category;
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) throw new ErrorResponse("Product not found", 404);
  await product.destroy();
  res.json({ message: "Product deleted successfully" });
};
