// 开发一个判断登录的插件
import Vue from "vue";
import router from '@/router'
import store from '@/store'
import { Dialog } from 'vant'
Vue.use(Dialog)
const MyPlugin ={}

MyPlugin.install = function(Vue) {
  // 添加实例方法
  Vue.prototype.$judgelogin = function() {
    // 判断是否登录
    if (store.state.user) {
      //登录则跳转评论页
    } else {
      //未登录则弹确认框,判断用户是否登录
      Dialog
        .confirm({
          title: "未登录",
          message: "该操作需要登录认证,是否登录?"
        })
        .then(() => {
          router.push("/login");
        })
        .catch(error => {});
    }
  };
};

export default MyPlugin