<template>
  <div class="fundlist">
    <el-row class="btn-area">
      <el-col :span="22">1</el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="addProfile">添加数据</el-button>
      </el-col>
    </el-row>
    <ProfileDialog :dialog="dialog" :profile="profile" @update="fetchProfles"></ProfileDialog>
    <el-table :data="profiles" border style="width: 100%" size="small">
      <el-table-column prop="date" :formatter="formatDate" label="日期" width="120" align="center"></el-table-column>
      <el-table-column prop="isMarket" label="集会日" width="80" align="center">
        <template slot-scope="scope">
          <span
            :style="'font-size:20px;color:' + (scope.row.isMarket==true ? '#67C23A' : '#F56C6C')"
          >
            <i :class="'el-icon-circle-' + (scope.row.isMarket==true ? 'check' : 'close')"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="duckCount" label="烤鸭数" width="95" align="center">
        <template slot-scope="scope">
          <span style="color: #E6A23C">{{scope.row.duckCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="income" label="营业额" width="95" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF">{{scope.row.income}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="foodsExpend" label="进货支出" width="95" align="center">
        <template slot-scope="scope">
          <span style="color: #F56C6C">{{scope.row.foodsExpend}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="frozenExpend" label="冻鸭支出" width="95" align="center">
        <template slot-scope="scope">
          <span style="color: #F56C6C">{{scope.row.frozenExpend}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="otherExpend" label="其它支出" width="95" align="center">
        <template slot-scope="scope">
          <span style="color: #F56C6C">{{scope.row.otherExpend}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="利润" width="95" align="center">
        <template slot-scope="scope">
          <span style="color: #67C23A">{{scope.row.profit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="editProfile(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import facha from 'fecha';
import ProfileDialog from '@/components/ProfileDialog.vue';
export default {
  name: 'fundlist',
  data() {
    return {
      profiles: [],
      dialog: {
        show: false,
        title: '',
        option: ''
      },
      profile: {
        _id: '',
        date: '',
        isMarket: false,
        duckCount: '',
        income: '',
        foodsExpend: '',
        frozenExpend: '',
        otherExpend: '',
        profit: 0,
        remark: ''
      }
    };
  },
  components: {
    ProfileDialog
  },
  methods: {
    // 格式化时间
    formatDate(row, column, cellValue, index) {
      const date = facha.format(new Date(cellValue), 'YYYY-MM-DD');
      return date;
    },
    // 添加profile按钮
    addProfile() {
      this.dialog = {
        show: true,
        title: '添加数据',
        option: 'add'
      };
      this.profile = {
        date: '',
        isMarket: false,
        duckCount: '',
        income: '',
        foodsExpend: '',
        frozenExpend: '',
        otherExpend: '',
        profit: '',
        remark: ''
      };
    },
    editProfile(index, row) {
      this.dialog = {
        show: true,
        title: '编辑数据',
        option: 'edit'
      };
      this.profile = {
        _id: row._id,
        date: new Date(row.date),
        isMarket: row.isMarket,
        duckCount: row.duckCount,
        income: row.income,
        foodsExpend: row.foodsExpend,
        frozenExpend: row.frozenExpend,
        otherExpend: row.otherExpend,
        profit: row.profit,
        remark: row.remark
      };
    },
    // 删除用户
    handleDelete(index, row) {
      this.$confirm(
        `确认删除${facha.format(new Date(row.date), 'YYYY-MM-DD')}日的数据?`,
        '删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$axios.delete(`/profiles/${row._id}`).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            });
            this.fetchProfles();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 获取资金列表
    fetchProfles() {
      this.$axios.get('/profiles').then(res => {
        this.profiles = res.data;
      });
    }
  },
  created() {
    this.fetchProfles();
  }
};
</script>

<style scoped>
.btn-area {
  width: 100%;
  margin-bottom: 10px;
}
</style>
