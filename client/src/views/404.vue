<template>
  <div class="not-found">
    <img src="../assets/404.gif" alt>
    <el-button class="btn" type="success" icon="el-icon-s-home" @click="toHome">返回主页</el-button>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  methods: {
    toHome() {
      this.$router.push('/index/home');
    }
  }
};
</script>

<style scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7fbeed;
}
.btn {
  width: 120px;
  position: absolute;
  top: 75%;
}
</style>
