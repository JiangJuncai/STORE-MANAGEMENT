<template>
  <div class="profitlist">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <el-date-picker value-format="yyyy" v-model="queryYear" type="year" placeholder="选择要查询的年份"></el-date-picker>
        <el-button
          @click="queryData"
          type="primary"
          icon="el-icon-search"
          size="medium"
          style="margin-left:20px"
        >查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="profitList" style="width: 100%" border>
      <el-table-column prop="_id" :label="year + '年'" align="center">
        <template slot-scope="scope">
          <span style="color: #304455">{{scope.row._id}}月</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalDuckCount" label="烤鸭总数" align="center">
        <template slot-scope="scope">
          <span style="color: #E6A23C">{{scope.row.totalDuckCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalIncome" label="营业额" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF">{{scope.row.totalIncome}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalFoods" label="进货支出" align="center">
        <template slot-scope="scope">
          <span style="color: #F56C6C">{{scope.row.totalFoods}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalFrozen" label="冻货支出" align="center">
        <template slot-scope="scope">
          <span style="color: #F56C6C">{{scope.row.totalFrozen}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalOther" label="额外支出" align="center">
        <template slot-scope="scope">
          <span style="color: #F56C6C">{{scope.row.totalOther}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalProfit" label="月利润" align="center">
        <template slot-scope="scope">
          <span style="color: #67C23A">{{scope.row.totalProfit}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'profitlist',
  data() {
    return {
      profitList: [],
      year: '',
      queryYear: ''
    };
  },
  methods: {
    getIncome() {
      const date = new Date();
      this.year = `${date.getFullYear()}`;
      this.$axios.get('/income', { params: { year: this.year } }).then(res => {
        this.profitList = res.data;
      });
    },
    queryData() {
      if (this.queryYear) {
        this.$axios
          .get('/income', { params: { year: this.queryYear } })
          .then(res => {
            this.profitList = res.data;
          });
      } else {
        this.getIncome();
      }
    }
  },
  created() {
    this.getIncome();
  }
};
</script>

