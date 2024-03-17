const { buildSchema } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

let users = [];

const schema = buildSchema(`
type Query {
  login(email: String!, password: String!): String
  user(id: ID!): User
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
    // 检查用户是否已存在
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error('User already exists.');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建并保存新用户
    const user = new User({
      email,
      password: hashedPassword
    });
    const result = await user.save();

    // 返回新创建的用户信息
    return { id: result.id, email: result.email };
  },
  user: ({ id }) => {
    const user = users.find(user => user.id == id);
    if (!user) {
      throw new Error('User not found');
    }
    return { id: user.id, email: user.email };
  },
};

module.exports = { schema, root };
