import { NextFunction, Request, Response } from 'express';
import { User } from '@models/user';

const validatorHandler = ()=>{
  return (res: Response, req: Request, next: NextFunction) => {
    const newUser = new User({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
    });
    try {
      const validationError = newUser.validate();
      if (validationError) return res.status(400).json(validationError);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  }; 
};

export default validatorHandler;