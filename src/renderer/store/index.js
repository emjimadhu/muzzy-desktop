import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'

// Components Store Imports
import snackbar from '@/components/snackbar/scripts/store'
import player from '@/components/player/scripts/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar,
    player
  },
  strict: process.env.NODE_ENV !== 'production'
})
