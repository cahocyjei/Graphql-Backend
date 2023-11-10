import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";

const validatorHandler = ()=>{
    return (res: Response, req: Request, next: NextFunction) => {
        const newUser = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        try {
            const validationError = newUser.validateSync();
            if (validationError) return res.status(400).json(validationError);
            next();
        } catch (error: any) {
            res.status(400).json(error.message);
        }
} 
}

export default validatorHandler;