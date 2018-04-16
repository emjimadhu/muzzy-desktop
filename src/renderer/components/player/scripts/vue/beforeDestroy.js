export default function () {
  this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
  this.audio.removeEventListener('loadeddata', this._handleLoaded)
  this.audio.removeEventListener('pause', this._handlePlayPause)
  this.audio.removeEventListener('play', this._handlePlayPause)
  this.audio.removeEventListener('ended', this._handleEnded)
}
