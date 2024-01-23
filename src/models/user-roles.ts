import { DataTypes,Model } from 'sequelize';
import { Role } from './role';
import { User } from './user';

export class UserRole extends Model{}

export const initUserRoleModel = (sequelize:any)=>{
  UserRole.init({
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, { sequelize, tableName: 'UsersRoles', timestamps: true });
  User.belongsToMany(Role, { through: UserRole, as: 'roles', foreignKey: 'userId' });
  Role.belongsToMany(User, { through: UserRole, as: 'users', foreignKey: 'roleId' });
};
