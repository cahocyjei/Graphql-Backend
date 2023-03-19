import jwt from 'jsonwebtoken';
import config from '../confi'

export function createToken(payload:object,expire:object){
    return jwt.sign(payload,config.SECRET,expire);
}