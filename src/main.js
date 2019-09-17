import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
// 导入VeeValidate表单验证插件
import VeeValidate, { Validator } from 'vee-validate';
// 导入中文包
import zh_CN from 'vee-validate/dist/locale/zh_CN';


Vue.use(VeeValidate,{
  // 去除所有触发事件的方法
  event:''
});
// 使用中文
Validator.localize('zh_CN', zh_CN);
Vue.use(Vant);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
