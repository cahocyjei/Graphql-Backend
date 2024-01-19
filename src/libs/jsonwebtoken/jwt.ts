import jwt from 'jsonwebtoken';
import { Config } from '@config/index';


export const verifyToken = async (token: string) => {
  return jwt.verify(token, Config.jwtsecret);
};

export function createToken(payload:object,expire:object){
  return jwt.sign(payload,Config.jwtsecret,expire);
}


export const decodeToken = (token:string)=>{
  const decoded = Object.entries(jwt.verify(token,Config.jwtsecret));
  const claims = Object.fromEntries(decoded);
  return claims;
};