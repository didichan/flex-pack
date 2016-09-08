import 'babel-polyfill'
import Vue from 'vue'
import router from './router.js'
import App from './App'

import store from './data/store'

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app')
