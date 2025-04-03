import Joi from "joi";

const PostSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).max(5000).required(),
  userId: Joi.number().required(),
});

export default PostSchema;
