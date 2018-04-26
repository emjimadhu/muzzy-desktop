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
      path: '/artist',
      name: 'artist',
      component: require('@/pages/single-artist').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
