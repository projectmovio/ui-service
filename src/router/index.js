import Vue from 'vue'
import Router from 'vue-router'
import PageWatchHistory from '@/components/PageWatchHistory'
import PageStart from '@/components/PageStart'
import PageLogin from '@/components/PageLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageStart',
      component: PageStart
    },
    {
      path: '/watch-history/',
      name: 'PageWatchHistory',
      component: PageWatchHistory
    },
    {
      path: '/login/',
      name: 'PageLogin',
      component: PageLogin
    }
  ]
})
