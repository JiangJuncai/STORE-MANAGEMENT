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
    const profile = req.body;
    profile.year = req.body.date.split('-')[0];
    profile.month = req.body.date.split('-')[1];
    Profile.create(profile)
      .then(profile => {
        res.json('数据添加成功！');
      })
      .catch(err => {
        res.status(400).json('数据添加失败！');
      });
  }
);

/*
 * $route POST api/profiles
 * @desc get one page of profiles
 * @return profiles list
 * @access private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const total = await Profile.countDocuments();
    Profile.find()
      .skip((req.body.currentPage - 1) * 8)
      .limit(8)
      .sort({ date: -1 })
      .then(profiles => {
        res.json({
          profiles: profiles,
          total: total
        });
      })
      .catch(err => {
        console.log(err);
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
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body)
      .then(profile => {
        res.json('编辑数据成功！');
      })
      .catch(err => {
        res.status(400).json('编辑数据失败');
      });
  }
);
/*
 * $route POST api/profiles/query
 * @desc query profiles by date
 * @return profiles list
 * @access private
 */
router.post(
  '/query',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const totalProfiles = await Profile.find({
      date: { $regex: req.body.queryDate }
    });
    const total = totalProfiles.length;
    Profile.find({ date: { $regex: req.body.queryDate } })
      .skip((req.body.currentPage - 1) * 8)
      .limit(8)
      .sort({ date: -1 })
      .then(profiles => {
        res.json({
          profiles: profiles,
          total: total
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json('数据查询错误！');
      });
  }
);

module.exports = router;
