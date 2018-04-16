import { readDir } from '@/helpers/fileActions'
import Worker from '../myworker.worker.js'
const worker = new Worker()

export default {
  canPlay (v) {
    if (v) {
      this.songLoaded = true
    }
  },
  ended () {
    let index = this.playingIndex
    index++
    this.playSong(this.songs[index], index)
  },
  async onDirPicked (e) {
    this.listLoading = true
    const dirPath = e.target.files[0].path
    try {
      const fileNames = await readDir(dirPath)
      if (Array.isArray(fileNames) && fileNames.length > 0) {
        worker.postMessage({
          type: 1,
          fileNames,
          dirPath
        })
        worker.onmessage = ({data}) => {
          this.songs = JSON.parse(data)
          this.listLoading = false
        }
      }
    } catch (err) {
      console.log('Error When reading Directory')
      console.log(err)
      this.$store.dispatch('snackbarOpen', {
        color: 'error',
        msg: err
      })
    }
  },
  playSong (info, index) {
    let fileBuffer = Buffer.from(info.fileBuffer)
    const dataURI = fileBuffer.toString('base64')
    if (dataURI) {
      let audioFile = `data:audio/mp3;base64,${dataURI}`
      if (audioFile) {
        this.$store.dispatch('CHANGE_CURRENT_SONG', {
          file: audioFile,
          name: info.title,
          artist: info.artist,
          art: info.cover
        })
        this.playingIndex = index
        this.songLoaded = false
        this.songs[index]['dataURI'] = this.audioFile
      }
    }
  }
}
