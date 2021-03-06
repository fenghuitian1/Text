import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios' //引入axios

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/style/style.css' //引入css的重置样式

Vue.config.productionTip = false

Vue.prototype.Axios = Axios   // 配置axios
Vue.use(ElementUI); //配置elementUI

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
