import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@libs/db/sequelize';
export enum Roles{
  Admin = 'ADMIN',
  User = 'USER',
  Moderator = 'MODERATOR'
}

export class Role extends Model{
  public id!:number;
  public name!:string;

  static associate(models: any) {
    this.belongsToMany(models.User, {
      through: 'UserRoles', // Nombre de la tabla intermedia
      foreignKey: 'roleId',
    });
  }
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
},{ sequelize, tableName:'roles', modelName:'Role', timestamps:true });

export class UserRoles extends Model{}
UserRoles.init({
  UserId:{
    type:DataTypes.INTEGER,
    references:{
      model: 'users',
      key: 'id',
    },
  },
  RoleId:{
    type:DataTypes.INTEGER,
    references:{
      model: 'roles',
      key: 'id',
    },
  },
},{ sequelize, tableName:'UserRoles', timestamps:false });
