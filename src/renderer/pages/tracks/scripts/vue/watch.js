export default {
  currentSongEnded (v) {
    if (v) {
      console.log('Current Song Ended')
      console.log(v)
      this.ended()
    }
  }
}
