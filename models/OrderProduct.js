import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const OrderProduct = sequelize.define("OrderProduct", {
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

export default OrderProduct;
