import { buildSchema } from 'graphql';

export const shemaUser = buildSchema(`
type Query {
  getUser: UserDto!
  getUserById(idUser:ID):UserDto!
  getAllUsers:[UserDto!]!
}

type Mutation {
  createUser(dto: UserInput!): UserDto!
}

type UserDto {
  id: ID
  userName: String
  password: String
  email: String
  firstName: String
  lastName: String
  roles: [Role!]
}

type Role {
  id: ID!
  name: String!
}

input UserInput {
  userName: String!
  password: String!
  email: String!
  firstName: String!
  lastName: String
  roles: [ID]
}
`);