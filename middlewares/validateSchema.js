import ErrorResponse from "../utils/ErrorResponse.js";

const validateSchema = (schema) => (req, res, next) => {
  const values = schema.validate(req.body, { abortEarly: false });
  if (values.error) {
    return next(new ErrorResponse(values.error, 400));
  }
  next();
};

export default validateSchema;
