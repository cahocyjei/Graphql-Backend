import { DataTypes, Model } from 'sequelize';

export interface iRole {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export class Role extends Model {}
export const initRoleModel = (sequelize: any) => {
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
  }, { sequelize, modelName: 'Role' });
};