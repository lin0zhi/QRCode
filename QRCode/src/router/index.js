import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import index from '@/pages/index'
import home from '@/pages/home'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
