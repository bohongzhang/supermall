import Vue from 'vue'
import App from './App.vue'
import router from "./router";
//vue原型
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
