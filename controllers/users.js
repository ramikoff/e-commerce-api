import Post from "../models/Post.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { include: Post });

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  await user.update(req.body);
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  await user.destroy();
  res.json({ message: "User deleted" });
};
