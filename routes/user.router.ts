import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import * as authCtrl from '../controllers/auth.controller'
import * as authJwt from '../middlewares/auth';

const API_PREFIX = "/users";
const UserRoutes = express.Router();

UserRoutes.get(API_PREFIX + '/login',authCtrl.login);

UserRoutes.get(API_PREFIX + '/logout',authCtrl.logout);

UserRoutes.get(API_PREFIX + '/',userCtrl.getUsers);

UserRoutes.get(API_PREFIX + '/:id',userCtrl.getUserById);

UserRoutes.post(API_PREFIX + '/',authJwt.verifyToken,userCtrl.createUser);

UserRoutes.put(API_PREFIX + '/:id',userCtrl.updateUser);

UserRoutes.delete(API_PREFIX + '/:id',authJwt.verifyToken,userCtrl.deleteUser);

export default UserRoutes;