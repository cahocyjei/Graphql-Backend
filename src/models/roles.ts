import { DataTypes, Model } from "sequelize";
import { sequelize } from '@libs/db/sequelize'

export class Role extends Model{} 

Role.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize, tableName:'roles', modelName:'Role', timestamps:true});