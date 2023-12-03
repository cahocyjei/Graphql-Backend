import { encryptPassword } from '@libs/jsonwebtoken/bcrypts';
import  { User, Role } from '@models/index';
import { Roles } from '@models/roles';

export const findUser = async (_: any, { id }: any) => {
  let userFind:any;
  await User.findByPk(id)
    .then(async (user)=>{
      const userNoRoles =  user?.toJSON();
      await (user as any).getRoles()
        .then((Roles:any)=>{
          userFind = { ...userNoRoles,roles:Roles };
        });
    }).catch(()=> console.error('User not Exist'));
  if (!userFind) return { ...userFind, userName: 'User Not Exist'.toUpperCase() };
  return userFind;
};

export const findAll = async ()=>{
  return await User.findAll();
};

export const createUser = async (_: any, { dto }:any) => {
  const { roles } = dto;
  const password = await encryptPassword(dto.password);
  let roleVerify:string;
  let newUser:typeof dto;
  try {
    if (!roles){
      await Role.findAll({ where:{ name: Roles.User } })
        .then(async (roleFind) =>{
          newUser = { ...dto, password:password, roles:roleFind };
          const userSave:typeof dto = await User.create(newUser);
          await userSave.setRoles(roleFind);
        }).catch(error => console.error('Role not Exist: ', error));
    } else {
      const rolesUcase = roles.map((rol:string)=>rol.toUpperCase());
      await Role.findAll({ where:{ name: rolesUcase } })
        .then(async (verifRoles)=>{
          for (let i = 0; i < roles.length; i++) {
            if (!verifRoles.includes(roles[i]))
              roleVerify = roles[i];
          }
          if (verifRoles.length === roles.length)
            newUser = { ...dto, password:password, roles: verifRoles };
          const userSave:typeof dto = await User.create(newUser);
          await userSave.setRoles(verifRoles);
        }).catch(() => console.error(`"${roleVerify.toUpperCase()}"`, 'Role not Exist in DB'));
    }
    if (!newUser) return { userName: 'User not Created, Role not Exist in DB' };
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (_:any, { id, dto }:any)=>{
  const { password } = dto;
  let newUserToUp:typeof dto;
  try {
    await User.findByPk(id)
      .then(async (user)=>{
        if (password){
          newUserToUp = {
            ...user, ...dto,
            password: await encryptPassword(dto.password),
          };
          await user?.update(newUserToUp);
        } else {
          newUserToUp = { ...user, ...dto };
          await user?.update(newUserToUp);
        }
      });
    return newUserToUp;
  } catch (error) {
    console.error(error);
  }
};