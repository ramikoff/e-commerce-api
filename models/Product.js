import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Product;
