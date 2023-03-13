import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user';

const API_PREFIX = "/users";
const UserRoutes = express.Router();

UserRoutes.get(API_PREFIX + '/', getUsers);

UserRoutes.get(API_PREFIX + '/:id', getUserById);

UserRoutes.post(API_PREFIX + '/', createUser);

UserRoutes.put(API_PREFIX + '/:id', updateUser);

UserRoutes.delete(API_PREFIX + '/:id', deleteUser);

export default UserRoutes;