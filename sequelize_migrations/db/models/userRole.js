const { DataTypes } = require('sequelize');

const USER_ROLE_TABLE = 'UsersRoles';
const UserRoleSchema = {
  userId:{
    type:DataTypes.INTEGER,
    references:{
      model:'Users',
      key:'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  roleId:{
    type:DataTypes.INTEGER,
    references:{
      model:'Roles',
      key:'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
};
module.exports = { USER_ROLE_TABLE, UserRoleSchema };