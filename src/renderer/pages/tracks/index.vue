<template lang="html">
  <v-slide-x-transition mode="out-in">
    <div>
      <v-card>
        <v-card-title>
          Tracks
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openDir">Pick Directory</v-btn>
          <input
            type="file"
            style="display: none"
            ref="dirInput"
            @change="onDirPicked"
            webkitdirectory
          >
        </v-card-title>
        <v-card-text>
          <v-list two-line subheader dense>
            <v-list-tile avatar v-if="noFiles">
              <v-list-tile-avatar>
                <img v-if="!listLoading" src="static/z_no_album_art.jpg">
                <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p v-if="!listLoading">No Tracks in list.</p>
                  <p v-else>Loading Songs.</p>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <p v-if="!listLoading">Pick a Directory to load Songs.</p>
                  <p v-else>It may take few minutes at first. Please Hold On.</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-else v-for="(track, index) in tracks" :key="index">
              <v-list-tile-avatar>
                <img :src="track.cover">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ track.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ track.artist }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="playSong(track)">
                  <v-icon color="grey lighten-1">play_arrow</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>

      <player
        :file="audioFile"
        :albumArt="albumArt"
        :songName="songName"
        :songArtist="songArtist"
      />
    </div>
  </v-slide-x-transition>
</template>

<script type="text/javascript">
import { readDir, readFile } from '@/helpers/fileActions'
import NodeID3 from 'node-id3'

import player from '@/components/player'

export default {
  name: 'tracks',
  components: {
    player
  },
  computed: {
    noFiles () {
      return (!this.tracks.length > 0)
    }
  },
  data: () => ({
    audioFile: 'static/',
    albumArt: '',
    songName: '',
    songArtist: '',
    tracks: [],
    listLoading: false
  }),
  methods: {
    openDir () {
      this.$refs.dirInput.click()
    },
    onDirPicked (e) {
      this.listLoading = true
      setTimeout(() => {
        const dirPath = e.target.files[0].path
        let promiseCount = 1
        readDir(dirPath)
          .then((fileNames) => {
            promiseCount = 2
            if (fileNames.length > 0) {
              let promises = fileNames.map((fileName) => readFile(`${dirPath}/${fileName}`))
              this.listLoading = false
              return Promise.all(promises)
            }
          })
          .then((files) => {
            console.log('all promise')
            console.log(files)
            if (files.length > 0) {
              this.tracks = files.map((file) => {
                const tags = NodeID3.read(file)
                return {
                  fileURI: `data:audio/mp3;base64,${file.toString('base64')}`,
                  title: (tags.title) ? tags.title : 'Uknown Track',
                  artist: (tags.artist) ? tags.artist : 'Uknown Track',
                  cover: (tags.image) ? `data:image/${tags.image.mime};base64,${tags.image.imageBuffer.toString('base64')}` : 'static/z_no_album_art.jpg'
                }
              })
              console.log('tracks')
              console.log(this.tracks)
              this.listLoading = false
            }
          })
          .catch((error) => {
            this.listLoading = false
            switch (promiseCount) {
              case 1:
                console.log('read dir error')
                console.log(error)
                break
              case 2:
                console.log('read file error')
                console.log(error)
                break
            }
          })
      }, 6000)
    },
    playSong (info) {
      this.audioFile = info.fileURI
      this.songName = info.title
      this.songArtist = info.artist
      this.albumArt = info.cover
    }
  }
}
</script>
