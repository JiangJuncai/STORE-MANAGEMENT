const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const passport = require('passport');

/*
 * $route POST api/users/register
 * @desc register a user
 * @return user data
 * @access public
 */
router.post('/register', (req, res) => {
  // 查看username是否已被注册
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      res.status(400).json('该用户名已存在！');
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        identity: req.body.identity
      });
      // 给用户密码进行加密
      bcrypt.hash(newUser.password, 8, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json('用户注册成功！');
          })
          .catch(err => {
            res.status(400).json(err);
          });
      });
    }
  });
});

/*
 * $route POST api/users/login
 * @desc user login
 * @return token
 * @access public
 */
router.post('/login', (req, res) => {
  // 检测用户是否存在
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(404).json('该用户不存在！');
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username,
            identity: user.identity
          };
          const privateSecret = require('../../config/keys').privateSecret;
          jwt.sign(
            payload,
            privateSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          res.status(400).json('密码错误！');
        }
      });
    }
  });
});

/*
 * $route GET api/users
 * @desc get all users
 * @return user list
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.log(err);
      });
  }
);

/*
 * $route DELETE api/users/:id
 * @desc remove a user
 * @return user
 * @access private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.json({
          success: true,
          message: `删除用户${user.username}成功!`
        });
      })
      .catch(err => {
        res.json({
          success: false,
          message: '该用户不存在'
        });
      });
  }
);

module.exports = router;
