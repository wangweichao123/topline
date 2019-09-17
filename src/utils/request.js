// 封装aixos方法
import axios from 'axios'
import store from '@/store'
// 创建axios对象
const request = axios.create({
    // 设置基地址
    baseURL: 'http://ttapi.research.itcast.cn/app/',
  });

  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 判断用户是否登录或有token
    let user = store.state.user;
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log('111');
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data || response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 暴露对象
export default request;