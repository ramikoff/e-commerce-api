import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

<<<<<<< HEAD:models/User.js
const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
=======
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
>>>>>>> main:models/Category.js
});

export default Category;
