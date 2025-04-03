import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/posts.js";
import validateSchema from "../middlewares/validateSchema.js";
import PostSchema from "../schemas/PostSchema.js";

const postRouter = Router();

postRouter
  .route("/")
  .get(getPosts)
  .post(validateSchema(PostSchema), createPost);
postRouter.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default postRouter;
