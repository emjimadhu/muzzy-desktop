export default {
  CHANGE_CURRENT_SONG_FILE: (state, payload) => {
    state.currentSongFile = payload
  },
  CHANGE_CURRENT_SONG_NAME: (state, payload) => {
    state.currentSongName = payload
  },
  CHANGE_CURRENT_SONG_ARTIST: (state, payload) => {
    state.currentSongArtist = payload
  },
  CHANGE_CURRENT_SONG_ART: (state, payload) => {
    state.currentSongArt = payload
  },
  CHANGE_AUTOPLAY_STATE: (state, payload) => {
    state.autoPlay = payload
  }
}
