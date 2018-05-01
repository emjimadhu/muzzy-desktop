import { mapGetters } from 'vuex'

const formatTime = (secend) => {
  let time = new Date(secend * 1000).toISOString().substr(14, 5)
  return time
}

export default {
  ...mapGetters({
    currentSongFile: 'currentSongFile',
    currentSongArt: 'currentSongArt',
    currentSongName: 'currentSongName',
    currentSongArtist: 'currentSongArtist',
    currentSongInfo: 'currentSongInfo',
    autoPlay: 'autoPlay'
  }),
  duration () {
    return this.audio ? formatTime(this.totalDuration) : ''
  },
  playTime () {
    return `${this.currentTime} / ${this.duration}`
  }
}
