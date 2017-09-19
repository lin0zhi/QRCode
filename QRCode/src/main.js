// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import resource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
// import login from '../pages/login'
Vue.use(element)
Vue.use(resource)
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.prototype.glob = {
  isLoged: false,
  userName: '',
  profile: {}
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
