const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema'); // 確保路徑正確
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

var app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(res => console.log("連線資料成功"))
  .catch(err => console.log(err));

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema, // 使用剛剛建立的 schema
  graphiql: true, // 啟用 graphiql IDE
}));

module.exports = app;






// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { schema, root } = require('./graphql/schema');
// require('dotenv').config();

// const mongoose = require('mongoose');

// var app = express();

// mongoose.connect(process.env.DB_CONNECTION_STRING)
//   .then(res => console.log("連線資料成功"))
//   .catch(err => console.log(err))

//   app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true, // GraphQL IDE
//   }));


// module.exports = app;
