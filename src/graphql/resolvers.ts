import { findUser, createUser, updateUser, findAll } from '@services/userResolvers';

export  const resolvers = {
  Query: {
    getUser:findUser,
    getAllUser:findAll,
  },
  Mutation:{
    createUser,
    updateUser,
  },
};