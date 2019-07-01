const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const passport = require('passport');

/*
 * $route GET api/income/test
 * @desc test api
 * @return 'success'
 * @access public
 */
router.get('/test', (req, res) => {
  res.json(req.query.test);
});

/*
 * $route GET api/income
 * @desc get month data list of this year
 * @return month data list
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.aggregate([
      {
        $match: {
          year: req.query.year
        }
      },
      {
        $project: {
          month: 1,
          income: 1,
          foodsExpend: 1,
          frozenExpend: 1,
          otherExpend: 1,
          profit: 1,
          duckCount: 1
        }
      },
      {
        $group: {
          _id: '$month',
          totalIncome: { $sum: '$income' },
          totalFoods: { $sum: '$foodsExpend' },
          totalFrozen: { $sum: '$frozenExpend' },
          totalOther: { $sum: '$otherExpend' },
          totalProfit: { $sum: '$profit' },
          totalDuckCount: { $sum: '$duckCount' }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ])
      .then(datalist => {
        res.json(datalist);
      })
      .catch(err => {
        res.status(400).json('查询数据失败！');
      });
  }
);

/*
 * $route GET api/income/:year
 * @desc get total date of this year
 * @return total data obj
 * @access private
 */
router.get(
  '/:year',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.aggregate([
      {
        $match: {
          year: req.params.year
        }
      },
      {
        $project: {
          year: 1,
          income: 1,
          profit: 1,
          duckCount: 1
        }
      },
      {
        $group: {
          _id: '$year',
          totalIncome: { $sum: '$income' },
          totalProfit: { $sum: '$profit' },
          totalDuckCount: { $sum: '$duckCount' }
        }
      }
    ])
      .then(datalist => {
        res.json(datalist);
      })
      .catch(err => {
        res.status(400).json('查询数据失败！');
      });
  }
);

module.exports = router;
