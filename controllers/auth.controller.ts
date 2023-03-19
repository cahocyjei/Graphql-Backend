import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { createToken } from '../libs/jwt'
import Roles from '../models/Roles';

export const login = async (req: Request, res: Response) => {
    //getting user data
    const { name, email, password, roles } = req.body;
    // user instance
    const newUser = new UserModel({
        name,
        email,
        password: await UserModel.encryptPassword(password)
    });
    // 
    const ids = [];
    const foundRoles = await Roles.find();
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            for (let j = 0; j < foundRoles.length; j++) {
                if (roles[i] == foundRoles[j].name) {
                    ids.push(foundRoles[j]._id);
                    break;
                }

            }
        }
        newUser.roles = ids;
    }else{
        const foundRole = await Roles.findOne({name:'user'});
        const id = foundRole?._id;
        if (id) {
            newUser.roles.push(id);
        }
    }
    //Save user
    const saveUser = await newUser.save();

    //Create token
    const token = createToken({id:saveUser._id},{
        expiresIn:3600 //1hora
    });
    // Result
    res.status(200).json({
        newUser,
        token
    });

}

export const logout = async (req: Request, res: Response) => { }