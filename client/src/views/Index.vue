<template>
  <div class="index">
    <el-container direction="vertical">
      <HeaderNav></HeaderNav>
      <el-container>
        <Aside></Aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
// @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue';
import Aside from '@/components/Aside.vue';

export default {
  name: 'index',
  components: {
    HeaderNav,
    Aside
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    }
  },
  created() {
    const token = localStorage.getItem('token');
    const tokenDecode = jwt_decode(token);
    this.$store.dispatch('setAuthenticated', !this.isEmpty(tokenDecode));
    this.$store.dispatch('setUser', tokenDecode);
  }
};
</script>

<style scope>
html,
body {
  margin: 0;
  padding: 0;
}
.el-container {
  color: #304455;
  height: 100vh;
  background-color: #f8f8f8;
}

.el-main {
  width: 100%;
  height: 100%;
  color: #304455;
}
</style>
