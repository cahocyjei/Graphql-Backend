import { Response } from 'express';
export default {
    NAME:'troyka-sw',
    EMAIL:'troykasw@gmail.com',
    SECRET:'w1914jjj'
}

export const cookiesTroyka = (nameCookie:string,token:string)=>{
    return (res:Response)=>{
        res.cookie(nameCookie, token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',})
    }
}
