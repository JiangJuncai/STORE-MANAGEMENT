<template>
  <div class="userlist">
    <el-table :data="users" border style="width: 100%">
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="date" label="注册日期" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="identity" label="角色" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'userlist',
  data() {
    return {
      users: []
    };
  },
  created() {
    this.$axios.get('/users').then(res => {
      this.users = res.data;
    });
  }
};
</script>
