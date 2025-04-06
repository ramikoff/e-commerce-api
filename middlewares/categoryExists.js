import Category from "../models/Category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const categoryExists = async (req, res, next) => {
  const { name } = req.body;

  const found = await Category.findOne({ where: { name } });
  if (found) {
    throw new ErrorResponse("Category with that name already exists", 409);
  }
  next();
};

export default categoryExists;
