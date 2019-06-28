<template>
  <div class="userlist">
    <el-table :data="users" border style="width: 100%">
      <el-table-column type="index" width="100" align="center"></el-table-column>
      <el-table-column prop="date" :formatter="formatDate" label="注册日期" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="identity" label="角色" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.identity == 'manager' ? 'warning' : 'success'"
            size="medium"
          >{{scope.row.identity == 'manager' ? '管理员' : '员工'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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
  name: 'userlist',
  data() {
    return {
      users: [],
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
      const date = facha.format(new Date(cellValue), 'YYYY-MM-DD hh:mm:ss ZZ');
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
    this.fetchUserlist();
  }
};
</script>
