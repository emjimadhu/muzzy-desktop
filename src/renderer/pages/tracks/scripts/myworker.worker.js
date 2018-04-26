import NodeID3 from 'node-id3'
import mp3Duration from 'mp3-duration'

import { readFile } from '../../../helpers/fileActions'
import Helpers from '../../../utils/helpers'

self.onmessage = async ({data}) => {
  const dirPath = data.dirPath
  const files = data.files
  let startIndex = data.startIndex
  let totalDurations = data.totalDurations
  switch (data.type) {
    case 1:
      let finalArr = []
      let promises = []
      let durationPromises = []
      files.forEach((fileName, index) => {
        const filePath = `${dirPath}/${fileName}`
        promises.push(readFile(filePath))
        durationPromises.push(durationCalulation(filePath))
      })

      try {
        let finalDurations = await Promise.all(durationPromises)
        console.log('Durations Completed')
        console.log(finalDurations)
        let fileBuffers = await Promise.all(promises)
        console.log('File Reading Completed')
        console.log(fileBuffers)

        if (finalDurations.length > 0 && fileBuffers.length > 0) {
          console.log('Having Durations and File Buffers')

          fileBuffers.forEach((fileBuffer, index) => {
            const filePath = `${dirPath}/${files[index]}`
            const tags = NodeID3.read(fileBuffer)
            totalDurations += finalDurations[index]
            finalArr.push({
              title: (tags.title) ? tags.title : 'Unknown Track',
              album: (tags.album) ? tags.album : 'Unknown Album',
              artist: (tags.artist) ? tags.artist : 'Unknown Artist',
              genre: (tags.genre) ? tags.genre : 'Unknown Genre',
              cover: (tags.image) ? `data:image/${tags.image.mime};base64,${tags.image.imageBuffer.toString('base64')}` : 'static/z_no_album_art.jpg',
              path: filePath,
              dataURI: `data:audio/mp3;base64,${fileBuffer.toString('base64')}`,
              duration: Helpers.formatTime(finalDurations[index]),
              durationInSecs: finalDurations[index],
              index: startIndex,
              id: startIndex + 1
            })

            startIndex++
          })

          if (finalArr.length > 0) {
            console.log('Finished Promise')
            console.log('Final Files')
            console.log(finalArr)
            console.log('Counter')
            console.log(data.counter)
            console.log('Total Rounds')
            console.log(data.totalRounds)
            self.postMessage({
              songsList: finalArr,
              totalDurations: totalDurations
            })
            console.log('Send Data back to Parent From Worker')
            if ((data.counter + 1) === data.totalRounds) {
              console.log('All are done. Closing Web Worker.')
              self.close()
            }
          }
        }
      } catch (e) {
        console.log('Error on Something.')
        self.postMessage(e)
        self.close()
      }
      break
    default:
      self.postMessage(data)
      self.close()
  }
}

let durationCalulation = (filePath) => {
  return new Promise((resolve, reject) => {
    mp3Duration(filePath, true, function (err, duration) {
      if (err) reject(err.message)
      resolve(duration)
    })
  })
}
