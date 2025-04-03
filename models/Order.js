import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import User from "./User.js";

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
  },
  total: { type: DataTypes.FLOAT, allowNull: false },
});

Order.belongsTo(User, { foreignKey: "userId" });

export default Order;
