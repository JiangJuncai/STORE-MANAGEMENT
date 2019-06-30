import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import NotFound from './views/404.vue';
import UserList from './views/UserList.vue';
import FundList from './views/FundList.vue';
import ProfitList from './views/ProfitList.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: 'home', name: 'home', component: Home },
        { path: 'userlist', name: 'userlist', component: UserList },
        { path: 'fundlist', name: 'fundlist', component: FundList },
        { path: 'profitlist', name: 'profitlist', component: ProfitList }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/*',
      name: 'notFound',
      component: NotFound
    }
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if (to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

export default router;
