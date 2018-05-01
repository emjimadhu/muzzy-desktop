export default {
  CHANGE_CURRENT_SONG: ({commit}, payload) => {
    commit('CHANGE_CURRENT_SONG_FILE', payload.file)
    commit('CHANGE_CURRENT_SONG_NAME', payload.name)
    commit('CHANGE_CURRENT_SONG_ARTIST', payload.artist)
    commit('CHANGE_CURRENT_SONG_ART', payload.art)
    commit('CHANGE_AUTOPLAY_STATE', true)
    commit('CHANGE_CURRENT_SONG_INFO', payload)
  }
}
