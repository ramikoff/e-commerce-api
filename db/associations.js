import sequelize from './index.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

Category.hasMany(Product, {
  foreignKey: {
    allowNull: false,
    name: 'userId'
  }
});
Product.belongsTo(Category, { foreignKey: { allowNull: false, name: 'categoryId' }, onDelete: 'CASCADE' });

sequelize.sync();
