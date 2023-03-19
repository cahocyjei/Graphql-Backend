import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import * as authCtrl from '../controllers/auth.controller'

const API_PREFIX = "/users";
const UserRoutes = express.Router();

UserRoutes.post(API_PREFIX + '/login',authCtrl.login);

UserRoutes.post(API_PREFIX + '/logout',authCtrl.logout);

UserRoutes.get(API_PREFIX + '/',userCtrl.getUsers);

UserRoutes.get(API_PREFIX + '/:id',userCtrl.getUserById);

UserRoutes.post(API_PREFIX + '/',userCtrl.createUser);

UserRoutes.put(API_PREFIX + '/:id',userCtrl.updateUser);

UserRoutes.delete(API_PREFIX + '/:id',userCtrl.deleteUser);

export default UserRoutes;