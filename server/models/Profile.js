const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  income: {
    type: Number,
    required: true
  },
  // 日利润
  profit: {
    type: Number,
    required: true
  },
  // 额外支出
  otherExpend: {
    type: Number,
    default: 0
  },
  // 进货支出
  foodsExpend: {
    type: Number,
    default: 0
  },
  // 冻货支出
  frozenExpend: {
    type: Number,
    default: 0
  },
  // 烤鸭只数
  duckCount: {
    type: Number,
    required: true
  },
  // 是否集会
  isMarket: {
    type: Boolean,
    required: true
  },
  // 备注
  remark: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
