const state = {
  currentPlaylist: []
}

const getters = {
  currentPlaylist: (state) => state.currentPlaylist
}

const mutations = {
  CHANGE_CURRENT_PLAYLIST: (state, payload) => {
    state.currentPlaylist = payload
  }
}

const actions = {
  CURRENT_PLAYLIST: ({commit}, payload) => {
    commit('CHANGE_CURRENT_PLAYLIST', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
