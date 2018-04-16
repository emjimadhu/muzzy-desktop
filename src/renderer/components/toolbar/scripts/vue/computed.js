export default {
  darkApp: {
    get () {
      return this.$store.getters.darkApp
    },
    set (v) {
      this.$store.commit('CHANGE_DARKSTATE', v)
    }
  },
  searchTerm: {
    get () {
      return this.$store.getters.searchTerm
    },
    set (v) {
      this.$store.commit('CHANGE_SEARCH_TEXT', v)
    }
  }
}
