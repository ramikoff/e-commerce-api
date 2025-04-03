import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().alphanum().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default UserSchema;
