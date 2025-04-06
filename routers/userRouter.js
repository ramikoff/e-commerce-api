import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import validateSchema from "../middlewares/validateSchema.js";
import UserSchema from "../schemas/UserSchema.js";
import userExists from "../middlewares/userExists.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(validateSchema(UserSchema), userExists, createUser)
  .put(validateSchema(UserSchema), updateUser)
  .delete(deleteUser);
userRouter
  .route("/:id")
  .get(getUserById)
  .put(validateSchema(UserSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
