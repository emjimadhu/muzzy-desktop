import NodeID3 from 'node-id3'
import { readFile } from '../../../helpers/fileActions'

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
          fileBuffers.forEach((fileBuffer, index) => {
            const filePath = `${dirPath}/${files[index]}`
            const tags = NodeID3.read(fileBuffer)
            finalArr.push({
              title: (tags.title) ? tags.title : 'Unknown Track',
              album: (tags.album) ? tags.album : 'Unknown Album',
              artist: (tags.artist) ? tags.artist : 'Unknown Artist',
              genre: (tags.genre) ? tags.genre : 'Unknown Genre',
              cover: (tags.image) ? `data:image/${tags.image.mime};base64,${tags.image.imageBuffer.toString('base64')}` : 'static/z_no_album_art.jpg',
              path: filePath,
              fileBuffer
            })
          })
          console.log('Finished Promise')
          console.log('Final Files')
          console.log(finalArr)
          self.postMessage(finalArr)
          if (data.counter === data.totalRounds) {
            self.close()
          }
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
