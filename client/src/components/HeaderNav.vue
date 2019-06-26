<template>
  <el-header>
    <el-row type="flex" justify="space-between" class="header">
      <el-col class="title" :span="6">
        <img src="../assets/logo.png" alt>
        <span>店铺资金管理系统</span>
      </el-col>
      <el-col :span="3.5">
        <span class="user">Manager:Username</span>
        <el-dropdown trigger="click" @command="setDialogInfo">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'headerNav'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #fff;
  color: #304455;
  line-height: 60px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
}
.title img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
.title span {
  font-size: 24px;
  margin-left: 10px;
  vertical-align: middle;
}
.user {
  color: #304455;
}
.el-dropdown {
  color: #304455;
}
.el-dropdown-item {
  color: #304455;
}
</style>
