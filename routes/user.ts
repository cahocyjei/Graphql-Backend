import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user';

const API_PREFIX = "/users";
const UserRoutes = express.Router();

// Obtener todos los usuarios
UserRoutes.get(API_PREFIX + '/', getUsers);

// Obtener un usuario por ID
UserRoutes.get(API_PREFIX + '/:id', getUserById);

// Crear un nuevo usuario
UserRoutes.post(API_PREFIX + '/', createUser);

// Actualizar un usuario existente
UserRoutes.put(API_PREFIX + '/:id', updateUser);

// Eliminar un usuario
UserRoutes.delete(API_PREFIX + '/:id', deleteUser);

export default UserRoutes;