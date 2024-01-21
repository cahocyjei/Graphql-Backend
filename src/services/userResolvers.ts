import { encryptPassword } from '@libs/bcrypts';
import { Connection } from 'config/sequelize';
import { iUser } from 'models/user';

export const createUser = async (_: any, params : any) => {
  try {
    const sequelize = new Connection().sequelize;
    const { User, Role } = sequelize.models;
    let userDto: iUser  = params.dto;
    const password = await encryptPassword(userDto.password);
    const { roles } = userDto;
    if (!roles){
      const defaultRole = await Role.findByPk(1);
      if (!defaultRole) throw new Error('Rol predeterminado no encontrado en la base de datos.');

      userDto = { ...userDto, password: password as string };
      const userSaved = await User.create(userDto as any);
      await (userSaved as any).setRoles(defaultRole as any);
    } 
  } catch (error) {
    return 'Error' + error;
  }
};
