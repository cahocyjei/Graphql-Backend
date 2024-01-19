import { findUser, createUser, updateUser, findAll, deleteUser } from '@services/userResolvers';
import { login } from '@services/authLogin';

export  const resolvers = {
  Query: {
    getUser:findUser,
    getAllUser:findAll,
  },
  Mutation:{
    login,
    createUser,
    updateUser,
    deleteUser,
  },
};