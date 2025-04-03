import Joi from "joi";

const UserSchema = Joi.object({
  firstName: Joi.string().alphanum().max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
});

export default UserSchema;
