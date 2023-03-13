import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user';

const UserRoutes = express.Router();

// Obtener todos los usuarios
UserRoutes.get('/users', getUsers);

// Obtener un usuario por ID
UserRoutes.get('/users/:id', getUserById);

// Crear un nuevo usuario
UserRoutes.post('/', createUser);

// Actualizar un usuario existente
UserRoutes.put('/:id', updateUser);

// Eliminar un usuario
UserRoutes.delete('/:id', deleteUser);

export default UserRoutes;