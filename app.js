const express = require('express');

const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphql/schema');

const mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb+srv://kelvin80121:WBdXadSw3RjzpzHu@gt.ptvgaic.mongodb.net/?retryWrites=true&w=majority&appName=GT')
  .then(res=> console.log("連線資料成功"));

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphql: true,
  }));


module.exports = app;
