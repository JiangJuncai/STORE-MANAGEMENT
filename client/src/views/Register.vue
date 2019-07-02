<template>
  <div class="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">用户注册</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">已有账号？登录</el-button>
      </div>
      <div class="text item">
        <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="identity">
            <el-select v-model="registerForm.identity" placeholder="请选择">
              <el-option label="管理员" value="manager" disabled></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册码" prop="key">
            <el-input type="text" v-model="registerForm.key"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerForm.password2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
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
    const validatePassword2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        password2: '',
        identity: '',
        key: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: '4到16位（字母，数字，下划线，减号）',
            trigger: 'blur'
          }
        ],
        key: [
          { required: true, message: '请输入注册码', trigger: 'blur' },
          {max: 20, message: '注册码过长', trigger:'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9]{4,12}$/,
            message: '6到12位（字母，数字）',
            trigger: 'blur'
          }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePassword2, trigger: 'blur' }
        ],
        identity: [{ required: true, message: '请选择身份', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/users/register', this.registerForm).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            });
            this.$router.push('/login');
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
      this.$router.push('/login');
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
