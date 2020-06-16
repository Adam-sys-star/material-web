import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
<<<<<<< HEAD

//import './mock/index.js';  // 该项目所有请求使用mockjs模拟

=======
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟s
>>>>>>> f82b363f17144a834bd3811ace2ebd1f05d898d9
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js' 

Vue.config.productionTip = false;

var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


