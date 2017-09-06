import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './common/css/swiper.min.css'
import 'common/stylus/index.styl'

fastclick.attach(document.body);

Vue.use(VueLazyload,{  //使用懒加载
  loading:require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
