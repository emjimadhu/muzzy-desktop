export default {
  CHANGE_DARKSTATE: (state, payload) => {
    state.darkApp = payload
  },
  CHANGE_SEARCH_TEXT: (state, paylaod) => {
    state.searchTerm = paylaod
  }
}
