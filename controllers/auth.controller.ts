import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { createToken, expireToken } from '../libs/jwt'

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const foundUser = await UserModel.findOne({ email: email });
        if (!foundUser)return res.json('User not exist');  
            const verifyPass = await UserModel.comparePassword(password, foundUser.password);
            if (!verifyPass)return res.json('Problem with email or password');
                const token = createToken({ id: foundUser._id }, {
                    expiresIn: 3600 //1hora
                });
                res.json({
                    "jwToken": token
                });
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}

export const logout = async (req: Request, res: Response) => { }