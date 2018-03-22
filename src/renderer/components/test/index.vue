<template lang="html">
  <div>
    <v-btn color="primary" @click="openDir">Pick Directory</v-btn>
    <input
      type="file"
      style="display: none"
      ref="dirInput"
      @change="onDirPicked"
      webkitdirectory
    >

    <v-layout row>
      <v-flex xs12>
        <audio controls>
          <source :src="audioFile" type="audio/mpeg">
        </audio>
      </v-flex>
    </v-layout>
  </div>
</template>

<script type="text/javascript">
import fs from 'fs'
// import dataurl from 'dataurl'
// import h5 from 'electron-audio-conversion'

export default {
  name: 'test',
  data: () => ({
    audioFile: ''
  }),
  methods: {
    openDir () {
      this.$refs.dirInput.click()
    },
    onDirPicked (e) {
      // const selectedFiles = e.target.files
      // if (selectedFiles[0]) {
      //   console.log('selected files')
      //   console.log(selectedFiles[0])
      //   const fr = new FileReader()
      //   fr.readAsDataURL(selectedFiles[0])
      //   fr.addEventListener('load', () => {
      //     console.log('laod event')
      //     console.log('fr result')
      //     console.log(fr.result)
      //     this.audioFile = fr.result
      //   })
      //   console.log(this.audioFile)
      // }
      // console.log('whole event')
      // console.log(e)
      // console.log('selected path')
      // const dirPath = e.target.files[0].path
      // console.log(dirPath)
      //
      // fs.readdir(dirPath, (err, files) => {
      //   console.log('files inside folder')
      //   console.log(Array.isArray(files))
      //   console.log(err)
      //   this.audioFile = `file//${dirPath}/${files[0]}`
      //   console.log(this.audioFile)
      //   // fs.readFile(`${dirPath}/${files[0]}`, (err, file) => {
      //   //   console.log('single file')
      //   //   console.log(file)
      //   //   let data = dataurl.convert({ data: file, mimetype: 'audio/mp3' })
      //   //   console.log('data url')
      //   //   // console.log(data)
      //   //   this.audioFile = data
      //   //   console.log('file read error')
      //   //   console.log(err)
      //   // })
      // })

      const dirPath = e.target.files[0].path
      const fileFormat = new Set(['mp3', 'aac', 'wav'])
      let fileList = new Set()
      let files = fs.readdirSync(dirPath)
      files.forEach((item) => {
        let tmpPath = dirPath + '/' + item
        let stats = fs.statSync(tmpPath)
        if (!stats.isDirectory()) {
          if (fileFormat.has(item.replace(/^.+\./, ''))) {
            fileList.add(tmpPath)
          }
        }
      })
      console.log(fileList)
    }
  }
}
</script>
