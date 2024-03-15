const { buildSchema } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 假定的用戶存儲，實際應用中應該替換為數據庫調用
let users = [];

const schema = buildSchema(`
  type Query {
    login(email: String!, password: String!): String
  }

  type Mutation {
    register(email: String!, password: String!): User
  }

  type User {
    id: ID!
    email: String!
  }
`);

const root = {
  login: async ({ email, password }) => {
    const user = users.find(user => user.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
  },
  register: async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);
    return newUser;
  }
};

module.exports = { schema, root };
