<template>
  <div class="home">
    <el-container direction="vertical">
      <HeaderNav></HeaderNav>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue';

export default {
  name: 'home',
  components: {
    HeaderNav
  }
};
</script>

<style scope>
.el-container {
  height: 100vh;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
