import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

const userExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const found = await User.findOne({ where: { email } });

    if (found) {
      return next(
        new ErrorResponse("User with that email already exists", 409)
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default userExists;
