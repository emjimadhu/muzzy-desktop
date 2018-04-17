const formatTime = (secend) => {
  let time = new Date(secend * 1000).toISOString().substr(14, 5)
  return time
}

export default {
  setPosition () {
    this.audio.currentTime = parseInt(this.audio.duration / 100 * this.percentage)
  },
  stop () {
    this.paused = this.playing = false
    this.audio.pause()
    this.audio.currentTime = 0
  },
  play () {
    if (this.playing) return
    this.paused = false
    this.audio.play()
    this.playing = true
  },
  pause () {
    this.paused = !this.paused
    if (this.paused) {
      this.audio.pause()
    } else {
      this.audio.play()
    }
  },
  download () {
    this.audio.pause()
    window.open(this.file, 'download')
  },
  mute () {
    this.isMuted = !this.isMuted
    this.audio.muted = this.isMuted
    this.volumeValue = this.isMuted ? 0 : 75
    this.muteColor = this.isMuted ? 'primary white--text' : 'white--text'
  },
  loop () {
    this.onLoop = !this.onLoop
    this.audio.loop = this.onLoop
    this.loopColor = this.onLoop ? 'primary white--text' : 'white--text'
  },
  shuffle () {
    this.$store.commit('CHANGE_SHUFFLE_STATUS', !this.$store.getters.shuffle)
    this.shuffleColor = this.$store.getters.shuffle ? 'primary white--text' : 'white--text'
  },
  reload () {
    this.audio.load()
  },
  canPlay (v) {
    if (v) {
      this.$store.commit('CHANGE_CANPLAY_STATUS', true)
    }
  },
  ended () {
    this.$store.commit('CHANGE_CURRENT_SONG_ENDED', true)
  },
  _handleLoaded () {
    if (this.audio.readyState >= 2) {
      if (this.autoPlay) this.audio.play()
      this.loaded = true
      this.totalDuration = parseInt(this.audio.duration)
      this.playing = true
    } else {
      throw new Error('Failed to load sound file')
    }
  },
  _handlePlayingUI (e) {
    this.percentage = this.audio.currentTime / this.audio.duration * 100
    this.currentTime = formatTime(this.audio.currentTime)
  },
  _handlePlayPause (e) {
    if (e.type === 'pause' && this.paused === false && this.playing === false) {
      this.currentTime = '00:00:00'
    }
  },
  _handleEnded () {
    this.paused = this.playing = false
  },
  init () {
    this.audio.addEventListener('timeupdate', this._handlePlayingUI)
    this.audio.addEventListener('loadeddata', this._handleLoaded)
    this.audio.addEventListener('pause', this._handlePlayPause)
    this.audio.addEventListener('play', this._handlePlayPause)
    this.audio.addEventListener('ended', this._handleEnded)
  }
}
