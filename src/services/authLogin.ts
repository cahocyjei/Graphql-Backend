import { createToken } from '@libs/jwt';
import { comparePassword } from '@libs/bcrypts';
import User from 'db/models/user';
export const login = async (_:any,{ email, password }:any)=>{
  try {
    const user = await User.findOne({ where:{ email } });
    const verifP = await comparePassword(password, user?.dataValues.password);
    if (!user || !verifP)
      throw new Error('Invalid credentials');
    const token = createToken({ userId: user.dataValues.id },{ expiresIn: 60 });
    return { 
      token: token.toString(),
      userName: user.dataValues.userName,
      password: user.dataValues.password,
      email: user.dataValues.email,
    };
  } catch (error) {
    console.error(error);
  }
};