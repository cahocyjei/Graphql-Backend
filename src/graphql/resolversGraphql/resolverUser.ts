import { Connection } from 'config/sequelize';
import { iUser } from 'models/user';

const sequelize = new Connection().sequelize;
const { User, Role } = sequelize.models;

export const findAll = () =>{
  try {
    return sequelize.transaction(async(t:any)=>{
      const findAllUsers = await User.findAll({ 
        include: [{ model: Role, as: 'roles' }],
        transaction: t,
      });
      return findAllUsers;
    });
  } catch (error) {
    throw new Error('Error' + error);
  }
};

export const findById = async (_:any,{ idUser }:any)=>{
  try {
    return sequelize.transaction(async(t:any)=>{
      const userFindWithRoles = await User.findByPk(idUser, { 
        include: [{ model: Role, as: 'roles' }],
        transaction: t,
      });
      return userFindWithRoles;
    });
  } catch (error) {
    throw new Error('Error' + error);
  }
};

export const createUser = async (_: any, params : any) => {
  try {
    const userDto: iUser = params.dto;
    const { roles } = userDto;
    const userSaved: any = User.build(userDto as any);
    const result = await sequelize.transaction(async (t) => {
      await userSaved.save({ transaction: t });
      if (!roles){
        const defaultRole = await Role.findByPk(process.env.DEFAULT_ROLE_ID);
        if (!defaultRole) throw new Error('Rol predeterminado no encontrado en la base de datos.');
        await userSaved.setRoles([defaultRole.getDataValue('id')], { transaction: t });
      } else {
        await userSaved.setRoles(roles, { transaction: t });
      }
      const userWithRoles = await User.findByPk(userSaved.id, {
        include: [{ model: Role, as: 'roles' }],
        transaction: t,
      });
      return userWithRoles;
    });
    return result;
  } catch (error) {
    throw new Error('Error' + error);
  }
};
