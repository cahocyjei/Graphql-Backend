import { User } from '@models/user';

export const findUser = async (_: any, { id }: User) => {
  return await User.findByPk(id);
};

export const findAll = async ()=>{
  return await User.findAll();
};

export const createUser = async (_: any, { dto }:any) => {
  try {
    const newUser = await User.create({ 
      ...dto,
      password:await User.encryptPassword(dto.password),
    });
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
            password: await User.encryptPassword(dto.password),
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