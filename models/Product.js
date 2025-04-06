import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

// Product.hasMany(OrderProduct, { foreignKey: "productId" });
// OrderProduct.belongsTo(Product, { foreignKey: "productId" });

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Product;
