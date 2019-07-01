<template>
  <el-header>
    <el-row type="flex" justify="space-between" class="header">
      <el-col class="title" :span="6">
        <img src="../assets/logo.png" alt />
        <span>店铺流水管理系统</span>
      </el-col>
      <el-col :span="3.5">
        <span
          class="identity"
        >{{user.identity ? (user.identity=='manager' ? '管理员:' : '员工:') : '请登录'}}</span>
        <span class="user" v-if="user.username">
          {{user.username ? user.username : '请登录'}}
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
    <ChangePassword :dialog="dialog" :user="user"></ChangePassword>
  </el-header>
</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue';
export default {
  name: 'headerNav',
  data() {
    return {
      dialog: {
        show: false
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    ChangePassword
  },
  methods: {
    setDialogInfo(command) {
      switch (command) {
        case 'info':
          this.changePassword();
          break;
        case 'logout':
          this.logout();
          break;
      }
    },
    changePassword() {
      this.dialog.show = true;
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('clearCurrentState');
      this.$router.push('/login');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #fff;
  color: #304455;
  line-height: 60px;
  box-sizing: border-box;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.45);
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
.identity {
  font-size: 16px;
  font-weight: bold;
  color: #58c18c;
  margin-right: 5px;
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
