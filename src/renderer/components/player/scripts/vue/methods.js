import Helpers from '@/utils/helpers'

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
    this.currentTime = Helpers.formatTime(this.audio.currentTime)
  },
  _handlePlayPause (e) {
    if (e.type === 'pause' && this.paused === false && this.playing === false) {
      this.currentTime = '00:00:00'
    }
  },
  _handleEnded () {
    this.paused = this.playing = false
  },
  _handleVisualizer () {
    console.log('Audio File ')
    console.log(this.audio.src)
    let context = new AudioContext()
    const src = context.createMediaElementSource(this.audio)
    console.log('Audio File')
    console.log(this.audio)
    console.log('SRC')
    console.log(src)
    let analyser = context.createAnalyser()
    console.log('Ananlyser')
    console.log(analyser)

    let canvas = document.getElementById('canvas')
    console.log('Canvas')
    console.log(canvas)
    canvas.width = 700
    canvas.height = 400
    let ctx = canvas.getContext('2d')
    console.log('CTX')
    console.log(ctx)

    src.connect(analyser)
    console.log('Context Destination')
    console.log(context.destination)
    analyser.connect(context.destination)

    analyser.fftSize = 256

    const bufferLength = analyser.frequencyBinCount
    console.log(bufferLength)

    let dataArray = new Uint8Array(bufferLength)

    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const barWidth = (WIDTH / bufferLength) * 2.5
    let barHeight = null
    let x = 0

    renderFrame()

    function renderFrame () {
      console.log('Render Frame is working')
      requestAnimationFrame(this.renderFrame())

      x = 0

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]
        let r = barHeight + (25 * (i / bufferLength))
        let g = 250 * (i / bufferLength)
        let b = 50

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }
  },
  renderFrame (x, analyser, dataArray, ctx, WIDTH, HEIGHT, bufferLength, barHeight, barWidth) {
    console.log('Render Frame is working')
    requestAnimationFrame(this.renderFrame())

    x = 0

    analyser.getByteFrequencyData(dataArray)

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]
      let r = barHeight + (25 * (i / bufferLength))
      let g = 250 * (i / bufferLength)
      let b = 50

      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

      x += barWidth + 1
    }
  },
  init () {
    this.audio.addEventListener('timeupdate', this._handlePlayingUI)
    this.audio.addEventListener('loadeddata', this._handleLoaded)
    this.audio.addEventListener('pause', this._handlePlayPause)
    this.audio.addEventListener('play', this._handlePlayPause)
    this.audio.addEventListener('ended', this._handleEnded)
  }
}
