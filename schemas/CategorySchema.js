import Joi from "joi";

const CategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

export default CategorySchema;
