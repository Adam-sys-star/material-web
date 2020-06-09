import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js' 
import VueRouter from 'vue-router';
import ViewUI from 'view-design';
//引入css
import 'view-design/dist/styles/iview.css';

 Vue.use(VueRouter);
 Vue.use(ViewUI);
 
Vue.config.productionTip = false;

var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


