import NodeID3 from 'node-id3'
import mp3Duration from 'mp3-duration'

import { readDir, readFile } from '@/helpers/fileActions'
import Helpers from '@/utils/helpers'
import Worker from '../myworker.worker.js'
const worker = new Worker()

export default {
  canPlay (v) {
    if (v) {
      this.songLoaded = true
    }
  },
  ended () {
    let index = null
    if (this.playingIndex === (this.totalSelectedSongs - 1)) {
      console.log('')
      index = 0
    } else {
      index = this.playingIndex
    }
    if (this.$store.getters.shuffle) {
      index = Math.floor(Math.random() * (this.totalSelectedSongs - 1)) + 0
    } else {
      index++
    }
    this.playSong(this.currentPlaylist[index], index)
    this.$store.commit('CHANGE_CURRENT_SONG_ENDED', false)
  },
  async onDirPicked (e) {
    this.listLoading = true
    const dirPath = e.target.files[0].path
    try {
      const fileNames = await readDir(dirPath)
      if (Array.isArray(fileNames) && fileNames.length > 0) {
        this.totalSelectedSongs = fileNames.length
        const totalRounds = Math.ceil(fileNames.length / 10)
        if (fileNames.length > 10) {
          let startIndex = 0
          let endIndex = 10
          this.loopingSongs(0, startIndex, endIndex, totalRounds, fileNames, dirPath, [], 0, 0)
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
  loopingSongs (counter, startIndex, endIndex, totalRounds, fileNames, dirPath, processedSongsList, totalDurations) {
    if (!counter) {
      counter = 0
    }
    if (counter === totalRounds) {
      console.log('All Operations are complete')
      // processedSongsList.forEach((song, index) => {
      //   song['index'] = index
      //   song['id'] = index + 1
      //
      // })
      // this.songs = processedSongsList
      this.$store.dispatch('CURRENT_PLAYLIST', processedSongsList)
      console.log('Final Songs')
      console.log(this.currentPlaylist)
      console.log('Total Durations')
      console.log(totalDurations)
      console.log('Formated Time')
      this.totalSongsDurations = Helpers.formatTimeWithHour(totalDurations)
      console.log(this.totalSongsDurations)
      this.listLoading = false
      return false
    }
    let files = fileNames.slice(startIndex, endIndex)
    console.log(files)
    worker.postMessage({
      type: 1,
      files,
      dirPath,
      totalRounds,
      counter,
      totalDurations,
      startIndex
    })
    worker.onmessage = ({data}) => {
      if (data.songsList.length > 0) {
        console.log('data from web worker')
        console.log(data)
        data.songsList.forEach((song) => {
          processedSongsList.push(song)
        })
        startIndex = endIndex
        this.processedSongs = endIndex
        endIndex = endIndex + 10
        counter++
        console.log('Next loop start Index is ' + startIndex)
        console.log('Next Loop End End is ' + endIndex)
        console.log('Next Loop Counter is ' + counter)
        this.loopingSongs(counter, startIndex, endIndex, totalRounds, fileNames, dirPath, processedSongsList, data.totalDurations)
      }
    }
  },
  playSong (info, index) {
    console.log('All Songs')
    console.log(this.currentPlaylist)
    console.log('Current Index')
    console.log(index)
    console.log('Current Song')
    console.log(info)
    // let dataURI = null
    // if (this.songs[index]['dataURI']) {
    //   console.log('Data URI is present')
    //   dataURI = this.songs[index]['dataURI']
    // } else {
    //   console.log('Data URI is abscent')
    //   const fileBuffer = Buffer.from(info.fileBuffer)
    //   dataURI = fileBuffer.toString('base64')
    // }
    // if (dataURI) {
    //   let audioFile = `data:audio/mp3;base64,${dataURI}`
    //   if (audioFile) {
    //     this.$store.dispatch('CHANGE_CURRENT_SONG', {
    //       file: audioFile,
    //       name: info.title,
    //       artist: info.artist,
    //       art: info.cover
    //     })
    //     this.playingIndex = index
    //     this.songLoaded = false
    //     this.songs[index]['dataURI'] = dataURI
    //     new Notification(info.title, {
    //       body: `${info.artist} - ${info.album}`,
    //       icon: info.cover,
    //       image: info.cover
    //     })
    //   }
    // }
    this.$store.dispatch('CHANGE_CURRENT_SONG', {
      file: info.dataURI,
      name: info.title,
      artist: info.artist,
      art: info.cover
    })
    this.playingIndex = index
    this.songLoaded = false
    new Notification(info.title, {
      body: `${info.artist} - ${info.album}`,
      icon: info.cover,
      image: info.cover
    })
  },
  async loadDetails () {
    const rawBuffer = await readFile('/home/batman/Music/09 A New Low.mp3')
    const fileBuffer = Buffer.from(rawBuffer)
    const tags = NodeID3.read(fileBuffer)
    console.log(tags)
    this.durationCalulation(fileBuffer)
  },
  durationCalulation (fileBuffer) {
    // return new Promise((resolve, reject) => {
    //   mp3Duration(file, function (err, duration) {
    //     if (err) reject(err.message)
    //     resolve(duration)
    //   })
    // })
    mp3Duration(fileBuffer, function (err, duration) {
      if (err) return console.log(err.message)
      console.log(Helpers.formatTime(duration))
    })
  }
}
