import { mapGetters } from 'vuex'

export default {
  ...mapGetters({
    searchTerm: 'searchTerm',
    currentSongEnded: 'currentSongEnded',
    darkApp: 'darkApp',
    currentPlaylist: 'currentPlaylist'
  })
}
