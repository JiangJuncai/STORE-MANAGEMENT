/* TODO 修改密码功能 */
<template>
  <el-dialog title="修改密码" :visible.sync="dialog.show">
    <el-form :model="password" ref="passwordForm" :rules="passwordRules">
      <el-form-item prop="oldPassword" label="输入旧密码" label-width="130px">
        <el-input type="password" v-model="password.oldPassword" show-password></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" label="输入新密码" label-width="130px">
        <el-input type="password" v-model="password.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item prop="newPassword2" label="再次输入新密码" label-width="130px">
        <el-input type="password" v-model="password.newPassword2" show-password></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.show = false">取 消</el-button>
      <el-button type="primary" @click="changePassword('passwordForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { callbackify } from 'util';
export default {
  name: 'change-password',
  data() {
    const validatePassword2 = (rule, value, callback) => {
      if (value !== this.password.newPassword) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    return {
      password: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', triggle: 'blur' },
          {
            pattern: /^[A-Za-z0-9]{4,12}$/,
            message: '6到12位（字母，数字）',
            trigger: 'blur'
          }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', triggle: 'blur' },
          {
            pattern: /^[A-Za-z0-9]{4,12}$/,
            message: '6到12位（字母，数字）',
            trigger: 'blur'
          }
        ],
        newPassword2: [
          { required: true, message: '请再次输入新密码', triggle: 'blur' },
          { validator: validatePassword2, trigger: 'blur' }
        ]
      }
    };
  },
  props: {
    dialog: Object,
    user: Object
  },
  methods: {
    changePassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`/users/password/${this.user.id}`, this.password)
            .then(res => {
              this.$message({
                type: 'success',
                message: res.data
              });
              localStorage.removeItem('token');
              this.$store.dispatch('clearCurrentState');
              this.$router.push('/login');
            });
        } else {
          this.$message.error('表单填写错误');
        }
      });
    }
  }
};
</script>
