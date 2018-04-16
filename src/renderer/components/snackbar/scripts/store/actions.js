export default {
  snackbarClose: ({commit}) => {
    console.log('close clicked')
    commit('CHANGE_SNACKBARSTATE', false)
    commit('SET_SNACKBARCOLOR', '')
    commit('SET_SNACKBARMSG', '')
  },
  snackbarOpen: ({commit}, payload) => {
    commit('CHANGE_SNACKBARSTATE', true)
    commit('SET_SNACKBARCOLOR', payload.color)
    commit('SET_SNACKBARMSG', payload.msg)
  }
}
