const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphql/schema');
require('dotenv').config();

const mongoose = require('mongoose');

var app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(res => console.log("連線資料成功"))
  .catch(err => console.log(err))

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // GraphQL IDE
  }));


module.exports = app;
