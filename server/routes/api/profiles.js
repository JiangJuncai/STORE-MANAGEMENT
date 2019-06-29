const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const passport = require('passport');

/*
 * $route GET api/profiles/test
 * @desc test api
 * @return 'success'
 * @access public
 */
router.get('/test', (req, res) => {
  res.json('success');
});

/*
 * $route POST api/profiles/add
 * @desc add a profile
 * @return json
 * @access private
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.create(req.body)
      .then(profile => {
        res.json('数据添加成功！');
      })
      .catch(err => {
        res.status(400).json('数据添加失败！');
      });
  }
);

/*
 * $route GET api/profiles
 * @desc get all profiles
 * @return profiles list
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .then(profiles => {
        res.json(profiles);
      })
      .catch(err => {
        res.status(400).json('获取收益列表错误！');
      });
  }
);

/*
 * $route DELETE api/profiles/:id
 * @desc remove a profile by id
 * @return json message
 * @access private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove(req.params.id)
      .then(profile => {
        if (profile) res.json('删除数据成功！');
      })
      .catch(err => {
        res.status(400).json('删除数据错误！');
      });
  }
);

/*
 * $route DELETE api/profiles/edit/:id
 * @desc edit a profile by id
 * @return json message
 * @access private
 */
router.put('/edit/:id', (req, res) => {
  Profile.findByIdAndUpdate(req.params.id, req.body)
    .then(profile => {
      res.json('编辑数据成功！');
    })
    .catch(err => {
      res.status(400).json('编辑数据失败');
    });
});

module.exports = router;
