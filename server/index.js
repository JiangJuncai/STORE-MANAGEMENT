const express = require('express');
const app = express();

// use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 解决跨域
app.use(require('cors')());

// connect to mongoDB
const mongoose = require('mongoose');
const db = require('./config/keys').couldMongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
  });

// use passport
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

// use router
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const income = require('./routes/api/income');
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/income', income);

// 配置静态文件夹
var fs = require('fs');
var path = require('path');

app.use(express.static(path.resolve(__dirname, './dist')));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('http://localhost:3000');
});
