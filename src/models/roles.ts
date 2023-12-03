import { DataTypes, Model } from 'sequelize';
import sequelize from '@libs/db/sequelize';

export enum Roles{
  Admin = 'ADMIN',
  User = 'USER',
  Moderator = 'MODERATOR'
}
class Role extends Model {
  declare id: number;
  declare name:string;
}
Role.init({
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
},{ sequelize, modelName: 'Role' });

export default Role;