import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
// 导入VeeValidate表单验证插件
import VeeValidate, { Validator } from 'vee-validate';
// 导入中文包
import zh_CN from 'vee-validate/dist/locale/zh_CN';
// 导入相对时间差插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入dayjs用于格式化时间
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加载中文包
// 导入登录验证插件
import judgelogin from '@/utils/judgelogin.js'
import './assets/font_3vkh9a4iezg/iconfont'
import './assets/font_3vkh9a4iezg/iconfont.css'

dayjs.locale('zh-cn') // 全局使用中文
dayjs.extend(relativeTime)
Vue.use(VeeValidate,{
  // 去除所有触发事件的方法
  event:''
});
// 使用中文
Validator.localize('zh_CN', zh_CN);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(judgelogin);


// 设置一个时间差的全局过滤器
Vue.filter('changeTime', function (value) {
  return dayjs().from(dayjs(value))
})
// 设置一个格式化时间的过滤器
Vue.filter('timeformat', function (value) {
  return dayjs(value).format('MM-DD hh:mm')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
