import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import config from '../config';
import Roles from '../models/Roles';


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const jwHeader = req.headers["x-access-token"];
    const token = jwHeader?.toString();
    if (!token) return res.json("Token no provided");
    try {
        const decoded = jwt.verify(token, config.SECRET);
        if (decoded) {
            const convertDeco = Object.entries(decoded);
            const claims = Object.fromEntries(convertDeco);
            const foundUser = await UserModel.findById(claims.id);
            const foundRoles = await Roles.findOne({ name: { $in: 'admin' } });
            foundUser?.roles.filter(rol => rol === foundRoles?._id) ? next() : res.json('unauthorized');
        }
    } catch (error: any) {
        res.status(400).json(error.message);
    }
}

export const checkRoles = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.roles) {
        const foundRoles = await Roles.find();
        for (let i = 0; i < req.body.roles.length; i++) {
            if (req.body.roles[i] != foundRoles[i].name) {
                res.status(401).json(`${req.body.roles[i]} Not exist`);
                break;
            }
        }
    }
    next();
}