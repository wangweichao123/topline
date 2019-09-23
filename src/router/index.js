import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      name: 'list',
      path: '/list/:key',
      component: () => import('@/views/list')
    },
    {
      name: 'details',
      path: '/details/:id',
      component: () => import('@/views/details')
    },
    {
      path: '/',
      component:() => import("@/views/tabnav"),
      children:[
        {
          name: 'home',
          path:'home',
          component:() => import('@/views/home')
        },
      ]
    },
    
  ]
})
