import { Connection } from 'config/sequelize';
import { iUser } from 'models/user';

export const createUser = async (_: any, params : any) => {
  try {
    const sequelize = new Connection().sequelize;
    const userDto: iUser = params.dto;
    const { User, Role } = sequelize.models;
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
