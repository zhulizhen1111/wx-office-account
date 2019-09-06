// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import vueAxios from 'vue-axios'
import 'mint-ui/lib/style.css' //Mint-UI样式
import 'src/config/rem' //rem移动端适配
// import 'src/plugins/element.used' //按需加载element
import './styles/cssreset.css' //cssreset
import './assets/font/iconfont.css' //文字
import vueTouch from 'vue-plugin-touch';
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(vueTouch);

Vue.use(ElementUI)
Vue.use(vueAxios, axios)

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
