import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../libs/jwt';
import UserModel from '../models/userModel';
import Roles from '../models/Roles';


export const checkRoles = async (req: Request, res: Response, next: NextFunction) => {
    const { roles } = req.body;
    if (roles) {
        try {
            const foundRoles = (await Roles.find()).map(rol => rol.name);
            const role = await roles.filter((rol: any) => !foundRoles.includes(rol));
            if (role) {
                res.json(`The role ${role} not exist in database`);
            }else{
                next();
            }
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }
    next();
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const jwtHeader = req.headers['x-access-token'];
    const token = jwtHeader?.toString();
    try {
        if (!token) return res.json('Token no provided');
        if (!await verifyToken(token)) return;
        next();
    } catch (error: any) {
        res.status(500).json(error.message);
    }

}

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const jwtHeader = req.headers['x-access-token'];
    const token = jwtHeader?.toString();
    if (!token) return res.json('Not token provided');

    try {
        const decoded = await verifyToken(token);
        if (!decoded) return;
        const arrDeco = Object.entries(decoded);
        const claims = Object.fromEntries(arrDeco);
        const foundUser = await UserModel.findById(claims.id);
        const foundRoles = await Roles.findOne({ name: { $in: 'admin' } });
        foundUser?.roles.filter(rol => rol._id === foundRoles?._id) ? next() : res.json('unauthorized')
    } catch (error: any) {
        res.status(500).json(error.message);
    }
}