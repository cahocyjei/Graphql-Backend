import jwt from 'jsonwebtoken';
import config from '../config'


export const verifyToken = async (token: string) => {
    return jwt.verify(token, config.SECRET);
}

export function createToken(payload:object,expire:object){
    return jwt.sign(payload,config.SECRET,expire);
}


export const expireToken = (token:string)=>{
    const decoded = Object.entries(jwt.verify(token,config.SECRET));
    const claims = Object.fromEntries(decoded);
    return claims;
}