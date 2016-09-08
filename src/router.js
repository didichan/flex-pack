import Vue from 'vue'
import VueRouter from 'vue-router'

import Population from './pages/population'

Vue.use(VueRouter)
// Configure router
/* eslint-disable no-new */
var router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'population',
      component: Population
    }
  ]
})
/* eslint-enable no-new */
export default router
