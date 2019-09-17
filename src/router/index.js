import Vue from 'vue'
import Router from 'vue-router'
import { homedir } from 'os';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/',
      component:() => import("@/views/tabnav"),
      children:[
        {
          name: 'home',
          path:'home',
          component:() => import('@/views/home')
        }
      ]
    },
    // 重定向
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
