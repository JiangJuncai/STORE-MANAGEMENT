<template>
  <div class="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">用户登录</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">没有账号？注册</el-button>
      </div>
      <div class="text item">
        <el-form
          :model="loginForm"
          status-icon
          :rules="loginRules"
          ref="loginForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: '4到16位（字母，数字，下划线，减号）',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9]{4,12}$/,
            message: '6到12位（字母，数字）',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/users/login', this.loginForm).then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            this.$router.push('/home');
          });
        } else {
          this.$message({
            type: 'error',
            message: '表单填写错误'
          });
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scopde>
.register {
  width: 100%;
  height: 100vh;
  background: url('../assets/bg.jpg') no-repeat fixed;
  background-size: cover;
}
.box-card {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 20px;
}
.btn {
  width: 100%;
}
</style>
