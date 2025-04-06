import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Category = sequelize.define('Category', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default Category;
