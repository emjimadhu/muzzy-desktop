import NodeID3 from 'node-id3'
import { readFile } from '../../../helpers/fileActions'

self.onmessage = ({data}) => {
  const dirPath = data.dirPath
  const fileNames = data.fileNames
  switch (data.type) {
    case 1:
      let finalArr = []
      let promises = []
      console.log('Entering file names loop')
      fileNames.forEach((fileName, index) => {
        if (index < 20) {
          const filePath = `${dirPath}/${fileName}`
          console.log('Creating promise read file')
          promises.push(readFile(filePath))
        }
      })
      console.log('Entering promise all')
      Promise.all(promises)
        .then((fileBuffers) => {
          console.log('Got file buffers')
          console.log('Entering file buffer loop')
          fileBuffers.forEach((fileBuffer, index) => {
            const filePath = `${dirPath}/${fileNames[index]}`
            console.log('Entering id3')
            const tags = NodeID3.read(filePath)
            console.log('Exsisting id3')
            finalArr.push({
              title: (tags.title) ? tags.title : 'Unknown Track',
              album: (tags.album) ? tags.title : 'Unknown Album',
              artist: (tags.artist) ? tags.artist : 'Unknown Artist',
              cover: (tags.image) ? `data:image/${tags.image.mime};base64,${tags.image.imageBuffer.toString('base64')}` : 'static/z_no_album_art.jpg',
              path: filePath,
              fileBuffer,
              index
            })
          })
          console.log('Finished Promise')
          self.postMessage(JSON.stringify(finalArr))
          self.close()
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
