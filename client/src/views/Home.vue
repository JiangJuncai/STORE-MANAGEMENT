<template>
  <div class="home">
    <el-row class="title-row">
      <el-col :span="24">
        <span class="home-title">店铺流水管理系统</span>
      </el-col>
    </el-row>
    <el-row class="progress-row">
      <el-col :span="8" class="progress-col">
        <div class="circle circle1">
          <div class="circle-title">{{thisYear}}年总营业额</div>
          <div class="circle-data">
            {{totalData.totalIncome}}
            <span>元</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="progress-col">
        <div class="circle circle2">
          <div class="circle-title">{{thisYear}}年总利润</div>
          <div class="circle-data">
            {{totalData.totalProfit}}
            <span>元</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="progress-col">
        <div class="circle circle3">
          <div class="circle-title">{{thisYear}}年售出烤鸭</div>
          <div class="circle-data">
            {{totalData.totalDuckCount}}
            <span>只</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      thisYear: '',
      totalData: {}
    };
  },
  methods: {},
  created() {
    this.thisYear = `${new Date().getFullYear()}`;
    this.$axios.get(`/income/${this.thisYear}`).then(res => {
      this.totalData = res.data[0];
    });
  }
};
</script>

<style scope>
.title-row {
  margin-top: 10px;
  text-align: center;
}
.home-title {
  font-size: 80px;
  text-align: center;
}
.progress-col {
  margin-top: 60px;
}
.circle {
  margin: auto;
  width: 330px;
  height: 330px;
  box-sizing: border-box;
  border-radius: 50%;
  text-align: center;
}
.circle1 {
  border: 20px solid #409eff;
}
.circle2 {
  border: 20px solid #67c23a;
}
.circle3 {
  border: 20px solid #e6a23c;
}
.circle-title {
  margin-top: 20%;
  font-size: 26px;
}
.circle-data {
  margin-top: 12%;
  font-size: 64px;
}
.circle-data span {
  font-size: 36px;
}
</style>
