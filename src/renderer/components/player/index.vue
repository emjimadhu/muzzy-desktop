<template>
  <div>
    <v-footer
      fixed
      app
      height="70px"
    >
      <v-layout row>
        <v-flex xs12>
          <v-list two-line subheader>
            <v-list-tile avatar>
              <v-list-tile-avatar
                @click="playing ? pause() : play()" :disabled="loaded === false"
                style="cursor:pointer;"
              >
                <v-icon
                  v-if="playing === false || paused === true"
                >
                  play_arrow
                </v-icon>
                <v-icon
                  class="primary white--text"
                  v-else
                >
                  pause
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p>{{ songName  }} - {{ songArtist }}</p>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-slider
                    :label="playTime"
                    @click.native="setPosition()"
                    v-model="percentage"
                    style="margin-top: -20px; margin-bottom: -30px; color: #fff;"
                    color="white"
                    track-color="grey lighten-1"
                  />
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action @click="loop" :disabled="loaded === false">
                <v-btn icon :class="loopColor" >
                  <v-icon>loop</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action @click="mute()" :disabled="loaded === false">
                <v-btn icon :class="muteColor" >
                  <v-icon v-if="isMuted === false">volume_up</v-icon>
                  <v-icon v-else>volume_off</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-avatar
                  :tile="true"
                  class="pl-4"
                >
                  <img :src="albumArt">
                </v-avatar>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <audio id="player" ref="player" v-on:ended="ended" v-on:canplay="canPlay" :src="file"></audio>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
const formatTime = (secend) => {
  let time = new Date(secend * 1000).toISOString().substr(14, 5)
  return time
}
export default {
  name: 'player',
  props: {
    file: {
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    ended: {
      type: Function,
      default: () => {}
    },
    canPlay: {
      type: Function,
      default: () => {}
    },
    albumArt: {
      type: String,
      default: 'static/z_no_album_art.jpg'
    },
    songName: {
      type: String,
      default: 'UNKNOWN'
    },
    songArtist: {
      type: String,
      default: 'UNKNOWN Artist'
    }
  },
  computed: {
    duration () {
      return this.audio ? formatTime(this.totalDuration) : ''
    },
    playTime () {
      return `${this.currentTime} / ${this.duration}`
    }
  },
  data: () => ({
    isMuted: false,
    muteColor: 'white--text',
    loaded: false,
    playing: false,
    paused: false,
    playColor: 'white--text',
    percentage: 0,
    currentTime: '00:00',
    audio: undefined,
    totalDuration: 0,
    loopColor: 'white--text',
    onLoop: false
  }),
  methods: {
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
    reload () {
      this.audio.load()
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
  },
  mounted () {
    this.audio = this.$refs.player
    this.init()
  },
  beforeDestroy () {
    this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
    this.audio.removeEventListener('loadeddata', this._handleLoaded)
    this.audio.removeEventListener('pause', this._handlePlayPause)
    this.audio.removeEventListener('play', this._handlePlayPause)
    this.audio.removeEventListener('ended', this._handleEnded)
  }
}
</script>
