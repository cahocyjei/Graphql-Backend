const { DataTypes, Model } = require('sequelize');

const ROLE_TABLE = 'Roles'

const RoleSchema = {
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
  }
};

class Role extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through:'UserRoles',
      timestamps:true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}
module.exports = {Role, ROLE_TABLE, RoleSchema};