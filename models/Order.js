import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import OrderProduct from "./OrderProduct.js";

const Order = sequelize.define("Order", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
});

Order.hasMany(OrderProduct, { foreignKey: "orderId", as: "products" });
OrderProduct.belongsTo(Order, { foreignKey: "orderId" });

export default Order;
