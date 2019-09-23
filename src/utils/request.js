// 封装aixos方法
import axios from "axios";
import store from "@/store";
// 创建axios对象
const request = axios.create({
  // 设置基地址
  baseURL: "http://ttapi.research.itcast.cn/app/"
});
// 专门用于刷新token
const request_token = axios.create({
  // 设置基地址
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 判断用户是否登录或有token
    let user = store.state.user;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data.data || response;
  },
  async function(error) {
    console.dir(error);
    // 对响应错误做点什么
    // token过期返回401,发请求获取新token
    if (error.response.status === 401) {
      let refresh_token = store.state.user.refresh_token;
      let res = await request_token({
        url: "v1_0/authorizations",
        method: "put",
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      });
      let token = res.data.data.token;
        
      // 将新token存入vuex及本地
      store.commit("getUser", {
        token,
        refresh_token
      });
      
      // 重新发请求处理token过期问题
      return request(error.config);
    }
    return Promise.reject(error);
  }
);

// 暴露对象
export default request;
