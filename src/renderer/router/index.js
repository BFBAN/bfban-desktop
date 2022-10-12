import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/pages/index/index').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/pages/setting/index').default
    },
    {
      path: '/setting/keypress',
      name: 'keypress',
      component: require('@/pages/setting/keypress').default
    },
    {
      path: '/signin',
      name: 'signin',
      component: require('@/pages/signin').default
    },
    {
      path: '/report',
      name: 'report',
      component: require('@/pages/report/report').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
