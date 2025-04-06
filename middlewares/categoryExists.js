import Category from "../models/Category.js";

const categoryExists = async (req, res, next) => {
  const { email } = req.body;

  const found = await Category.findOne({ where: { email } });
  if (found) {
    throw new ErrorResponse("Category with that xxx already exists", 409);
  }
};

export default categoryExists;
