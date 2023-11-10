import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import Roles from '../models/Roles';
import { createToken } from '../libs/jwt';
import userModel from '../models/userModel';


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const foundUser = await UserModel.findOne({ email: email });
        if (!foundUser) return res.json('User not exist');
        const verifyPass = await UserModel.comparePassword(password, foundUser.password);
        if (!verifyPass) return res.json('Problem with email or password');
        const token = createToken({ id: foundUser._id }, {
            expiresIn: 3600 //1hora
        });
        res.json(token);
    } catch (err: any) {
        res.status(500).json(err.message)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users,);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err: any) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(500).send('Server Error');
    }
};


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, roles } = req.body;
    const newUser = new UserModel({
        name,
        email,
        password
    });

    try {
        const validationError = newUser.validateSync();
        if (validationError) return res.status(400).json(validationError.message);
        if(await userModel.findOne({email:email}))return res.json('User exist in database'); 
        await UserModel.encryptPassword(password);
        if (roles) {
            const role = await Roles.find({ name: { $in: roles } });
            console.log(role);
            newUser.roles = role.map(rol => rol._id);
        } else {
            const role = await Roles.findOne({ name: 'user' });
            if (!role) return res.json('Role user Not exist');
            newUser.roles.push(role._id);
        }
        await newUser.save();
        res.status(201).json({
            'Userd saved successfully': newUser
        });
    } catch (err: any) {
       res.status(204).json(err.message);
    }
    }


    export const updateUser = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        try {
            let user = await UserModel.findById({ id: req.params.id });
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
            user.name = name || user.name;
            user.email = email || user.email;
            await user.save();
            res.json(user);
        } catch (err: any) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }
            res.status(500).send(err.message);
        }
    };

    export const deleteUser = async (req: Request, res: Response) => {
        try {
            const user = await UserModel.findByIdAndRemove(req.params.id);
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
            res.json({ msg: 'Usuario eliminado' });
        } catch (err: any) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }
            res.status(500).send(err.message);
        }
    };