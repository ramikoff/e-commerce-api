import sequelize from "./index.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import OrderProduct from "../models/OrderProduct.js";

// User -> Order (One-to-Many)
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Category -> Product (One-to-Many)
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// Order -> Product (Many-to-Many via OrderProduct)
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId",
  as: "products",
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
  as: "orders",
});

// OrderProduct -> Order (Many-to-One)
Order.hasMany(OrderProduct, { foreignKey: "orderId", as: "orderProducts" });
OrderProduct.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// OrderProduct -> Product (Many-to-One)
Product.hasMany(OrderProduct, { foreignKey: "productId", as: "orderProducts" });
OrderProduct.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Sync all models with the database
sequelize.sync();

export default sequelize;
