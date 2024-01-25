import { createUser, findById, findAll } from 'graphql/resolversGraphql/resolverUser';
export  const resolvers = {
  Query:{
    getUserById:findById,
    getAllUsers:findAll,
  },
  Mutation:{
    createUser,
  },
};