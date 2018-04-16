export default {
  CHANGE_SNACKBARSTATE: (state, payload) => {
    state.snackbarState = payload
  },
  SET_SNACKBARCOLOR: (state, payload) => {
    state.snackbarColor = payload
  },
  SET_SNACKBARMSG: (state, payload) => {
    state.snackbarMSG = payload
  }
}
