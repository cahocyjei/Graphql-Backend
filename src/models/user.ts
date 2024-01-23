import { DataTypes, Model } from 'sequelize';
import { iRole } from './role';
import { encryptPassword } from '@libs/bcrypts';
export interface iUser {
    id: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: iRole[];
    createdAt: Date;
    updatedAt: Date;
}

export class User extends Model {}
export const initUserModel = (sequelize: any) => {
  User.init({
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
      async set(value: string) {
        const password = await encryptPassword(value);
        this.setDataValue('password', password);
      },
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
    },
  }, { sequelize, tableName: 'Users' });
};