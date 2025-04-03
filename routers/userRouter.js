import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import validateSchema from "../middlewares/validateSchema.js";
import UserSchema from "../schemas/UserSchema.js";
import userExists from "../middlewares/userExists.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(validateSchema(UserSchema), userExists, createUser);
userRouter
  .route("/:id")
  .get(getUserById)
  .put(validateSchema(UserSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
