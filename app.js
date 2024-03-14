// 1. router 路由
// 2. models 模型
// 3. controllers 控制器
// 4. views 視圖
// MVC

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const storyRouter = require('./routes/story');
const brickRouter = require('./routes/brick');
const postRouter = require('./routes/posts');

const mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb+srv://kelvin80121:iSKM5Vf2UE7KIZPL@jstorydemo.fsnxxtf.mongodb.net/?retryWrites=true&w=majority&appName=jStoryDemo')
  .then(res=> console.log("連線資料成功"));


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/story', storyRouter);
app.use('/brick', brickRouter);
app.use('/post', postRouter);

module.exports = app;
