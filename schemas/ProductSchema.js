import Joi from "joi";

const ProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(5000).required(),
  price: Joi.number().min(0).required(),
  categoryId: Joi.number().required(),
});

export default ProductSchema;
