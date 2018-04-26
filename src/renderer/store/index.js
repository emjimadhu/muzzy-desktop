import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'

// Components Store Imports
import toolbar from '@/components/toolbar/scripts/store'
import snackbar from '@/components/snackbar/scripts/store'
import player from '@/components/player/scripts/store'

// General Store Imports
import playlist from './modules/playlist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playlist,
    toolbar,
    snackbar,
    player
  },
  strict: process.env.NODE_ENV !== 'production'
})
