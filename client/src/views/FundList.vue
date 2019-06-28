<template>
  <div class="fundlist">
    <el-row class="btn-area">
      <el-col>
        <el-button type="primary" size="small">主要按钮</el-button>
      </el-col>
    </el-row>
    <el-table :data="profiles" border style="width: 100%" size="small">
      <el-table-column prop="date" :formatter="formatDate" label="日期" width="120" align="center"></el-table-column>
      <el-table-column prop="isMarket" label="集会日" width="80" align="center">
        <template slot-scope="scope">
          <span
            :style="'font-size:20px;color:' + (scope.row.isMarket=='true' ? '#67C23A' : '#F56C6C')"
          >
            <i :class="'el-icon-circle-' + (scope.row.isMarket=='true' ? 'check' : 'close')"></i>
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
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button size="small" @click="changeIdentity(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户编辑" :visible.sync="showDialog" :before-close="beforeCloseDialog">
      <el-form :model="userForm" ref="userForm" :rules="userRules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="80px">
          <el-select v-model="userForm.identity" placeholder="请选择角色权限">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="editUser('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import facha from 'fecha';
export default {
  name: 'fundlist',
  data() {
    return {
      profiles: [],
      showDialog: false,
      userForm: {},
      userRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: '4到16位（字母，数字，下划线，减号）',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    // 格式化时间
    formatDate(row, column, cellValue, index) {
      const date = facha.format(new Date(cellValue), 'YYYY-MM-DD');
      return date;
    },
    // 编辑按钮事件
    changeIdentity(index, row) {
      this.showDialog = true;
      this.userForm = row;
    },
    // 删除用户
    handleDelete(index, row) {
      this.$confirm(`是否删除用户${row.username}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.delete(`/users/${row._id}`).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            });
            this.fetchUserlist();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 获取用户列表
    fetchUserlist() {
      this.$axios.get('/users').then(res => {
        this.users = res.data;
      });
    },
    // 获取资金列表
    fetchProfles() {
      this.$axios.get('/profiles').then(res => {
        this.profiles = res.data;
      });
    },
    // 编辑用户
    editUser() {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          this.$axios
            .put(`/users/${this.userForm._id}`, this.userForm)
            .then(res => {
              this.$message({
                type: 'success',
                message: res.data
              });
              this.showDialog = false;
            });
        } else {
          this.$message.error('表单填写错误！');
          return false;
        }
      });
    },
    // 关掉dialog前，请求userlist
    beforeCloseDialog(done) {
      this.fetchUserlist();
      done();
    },
    cancelDialog() {
      this.showDialog = false;
      this.fetchUserlist();
    }
  },
  created() {
    this.fetchProfles();
  }
};
</script>

<style scoped>
.btn-area {
  margin-bottom: 10px;
}
</style>
