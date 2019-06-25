const express = require('express');
const app = express();

// use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongoDB
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
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
app.use('/api/users', users);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
