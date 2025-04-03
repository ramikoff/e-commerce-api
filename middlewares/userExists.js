import User from "../models/User.js";

const userExists = async (req, res, next) => {
  const { email } = req.body;

  const found = await User.findOne({ where: { email } });
  if (found) {
    throw new ErrorResponse("User with that email already exists", 409);
  }
};

export default userExists;
