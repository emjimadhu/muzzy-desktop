export default {
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
    default: 'UNKNOWN Name'
  },
  songArtist: {
    type: String,
    default: 'UNKNOWN Artist'
  }
}
