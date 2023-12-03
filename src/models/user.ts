import { DataTypes, Model } from 'sequelize';
import sequelize from '@libs/db/sequelize';
import Role from './roles';

class User extends Model{} 
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
  },{ sequelize, modelName:'User' });
User.belongsToMany(Role,{ through: 'UserRoles' });
export default User;
