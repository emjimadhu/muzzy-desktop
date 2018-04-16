import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tracks',
      component: require('@/pages/tracks').default
    },
    {
      path: '/albums',
      name: 'albums',
      component: require('@/pages/albums').default
    },
    {
      path: '/artists',
      name: 'artists',
      component: require('@/pages/artists').default
    },
    {
      path: '/background',
      name: 'background',
      component: require('@/pages/background').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
