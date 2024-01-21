import { createUser } from '@services/userResolvers';

export  const resolvers = {
  Query: {
  },
  Mutation:{
    createUser,
  },
};