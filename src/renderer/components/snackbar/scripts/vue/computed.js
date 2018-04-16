import { mapGetters } from 'vuex'

export default {
  ...mapGetters({
    snackbarColor: 'snackbarColor',
    snackbarMSG: 'snackbarMSG'
  }),
  snackbarState: {
    get () {
      return this.$store.getters.snackbarState
    },
    set (v) {
      this.$store.commit('CHANGE_SNACKBARSTATE', v)
    }
  }
}
