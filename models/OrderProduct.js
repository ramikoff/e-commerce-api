import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Order from "./Order.js";
import Product from "./Product.js";

const OrderProduct = sequelize.define("OrderProduct", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: "id" },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: "id" },
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

export default OrderProduct;
