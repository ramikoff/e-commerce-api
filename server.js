import express from "express";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import sequelize from "./db/index.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce API is running!");
});

app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.use(errorHandler);

sequelize.sync();

app.listen(port, () => console.log(`Server is running on port ${port}`));
