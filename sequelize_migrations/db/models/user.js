const { DataTypes } = require('sequelize');

const USER_TABLE = 'Users';
const UserSchema = {
  id: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  firstName:{
    type:DataTypes.STRING,
    allowNull:false, 
  },
  lastName:{
    type:DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
  }
};
module.exports = { USER_TABLE, UserSchema };