import NodeID3 from 'node-id3'
import mp3Duration from 'mp3-duration'

import { readFile } from '../../../helpers/fileActions'
import Helpers from '../../../utils/helpers'

self.onmessage = ({data}) => {
  const dirPath = data.dirPath
  const files = data.files
  switch (data.type) {
    case 1:
      let finalArr = []
      let promises = []
      files.forEach((fileName, index) => {
        const filePath = `${dirPath}/${fileName}`
        promises.push(readFile(filePath))
      })
      Promise.all(promises)
        .then((fileBuffers) => {
          console.log('File Reading Promise Complete')
          fileBuffers.forEach(async (fileBuffer, index) => {
            const filePath = `${dirPath}/${files[index]}`
            const tags = NodeID3.read(fileBuffer)
            const duration = await durationCalulation(fileBuffer)
            console.log('duration in file buffers loop')
            console.log(duration)
            if (duration) {
              finalArr.push({
                title: (tags.title) ? tags.title : 'Unknown Track',
                album: (tags.album) ? tags.album : 'Unknown Album',
                artist: (tags.artist) ? tags.artist : 'Unknown Artist',
                genre: (tags.genre) ? tags.genre : 'Unknown Genre',
                cover: (tags.image) ? `data:image/${tags.image.mime};base64,${tags.image.imageBuffer.toString('base64')}` : 'static/z_no_album_art.jpg',
                path: filePath,
                dataURI: `data:audio/mp3;base64,${fileBuffer.toString('base64')}`,
                duration: Helpers.formatTime(duration)
              })
            }
          })
          setTimeout(() => {
            if (finalArr.length > 0) {
              console.log('Finished Promise')
              console.log('Final Files')
              console.log(finalArr)
              console.log('Counter')
              console.log(data.counter)
              console.log('Total Rounds')
              console.log(data.totalRounds)
              self.postMessage(finalArr)
              if ((data.counter + 1) === data.totalRounds) {
                console.log('All are done. Closing Web Worker.')
                self.close()
              }
            }
          }, 1000)
        })
        .catch((error) => {
          self.postMessage(error)
          self.close()
        })
      break
    default:
      self.postMessage(data)
      self.close()
  }
}

let durationCalulation = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    mp3Duration(fileBuffer, function (err, duration) {
      if (err) reject(err.message)
      resolve(duration)
    })
  })
}
