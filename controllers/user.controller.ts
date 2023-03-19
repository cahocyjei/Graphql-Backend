import { Request, Response } from 'express';
import UserModel from '../models/userModel';

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
    try {
        const { name, email } = req.body;
        const newUser = new UserModel({ name, email });
        await newUser.save();
        res.json(newUser);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
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
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json({ msg: 'Usuario eliminado' });
    } catch (err: any) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(500).send(err.message);
    }
};