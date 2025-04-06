// import "./db/associations.js";
import express from "express";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import sequelize from "./db/index.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use(errorHandler);

sequelize.sync();

app.listen(port, () => console.log(`Server is running on port ${port}`));
