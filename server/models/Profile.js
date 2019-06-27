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
    required: true
  },
  // 进货支出
  foodsExpend: {
    type: Number,
    required: true
  },
  // 冻货支出
  frozenExpend: {
    type: Number,
    required: true
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
  isMarket: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
