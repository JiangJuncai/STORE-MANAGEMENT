import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from './router';

// 设置loading
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0.7)'
  });
}
function endLoading() {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    startLoading();
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    endLoading();
    return response;
  },
  error => {
    endLoading();
    const { status } = error.response;
    if (status == 401) {
      Message.error('token失效，请重新登录！');
      localStorage.removeItem('token');
      router.push('/login');
    } else {
      Message.error(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axios;
