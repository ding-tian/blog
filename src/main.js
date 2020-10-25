// 引入vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入路由
import router from './router'
// 引入全局css样式
import './assets/css/index.css'
// 引入字体图标
import './assets/font/iconfont.css'
// 引入axios
import axios from 'axios'

Vue.config.productionTip = false
// 将axios挂载到Vue原型上
Vue.prototype.$axios = axios
// 设置ajax请求时的url
axios.defaults.baseURL = 'http://localhost:80'
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
