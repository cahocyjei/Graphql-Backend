import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '@libs/db/sequelize';
import { Roles } from '@models/roles';
export class User extends Model{
  public id!:number;
  public userName!:string;
  public password!:string;
  public email!:string;
  public firstName!:string;
  public lastName!:string;
  public roles!:[Roles];

  static associate(models: any) {
    this.belongsToMany(models.Role, {
      through: 'UserRoles', // Nombre de la tabla intermedia
      foreignKey: 'userId',
    });
  }

  static async encryptPassword(password:string){
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error('Ocurrió un error durante el cifrado de la contraseña:');
    }
  }
  static async comparePassword(password:string,receivPassword:string){
    return await bcrypt.compare(password,receivPassword);
  }
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  firstName:{
    type:DataTypes.STRING,
    allowNull:false, 
  },
  lastName:{
    type:DataTypes.STRING,
  },
},{ sequelize, tableName: 'users', modelName: 'User' });