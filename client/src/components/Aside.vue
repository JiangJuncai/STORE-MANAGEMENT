<template>
  <el-aside width="210px">
    <el-menu :default-active="$route.path" router text-color="#304455" active-text-color="#58c18c">
      <el-menu-item index="/index/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>收支记录
        </template>
        <el-menu-item index="/index/fundlist">收支列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-data"></i>利润统计
        </template>
        <el-menu-item index="/index/profitlist">利润列表</el-menu-item>
        <el-menu-item index="2-2">利润图表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>用户管理
        </template>
        <el-menu-item index="/index/userlist">用户列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.el-aside {
  background-color: #d3dce6;
}
.el-menu {
  height: 100%;
}
</style>
