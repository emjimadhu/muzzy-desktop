<template lang="html">
  <v-slide-x-transition mode="out-in">
    <div class="pb-5">
      <v-card>
        <v-card-title>
          Tracks
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="$refs.dirInput.click()">Pick Directory</v-btn>
          <input
            type="file"
            style="display: none"
            ref="dirInput"
            @change="onDirPicked"
            webkitdirectory
          >
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="playlist"
            hide-actions
            :loading="listLoading"
            class="elevation-1"
            dark
          >
            <!-- <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear> -->
            <v-list two-line subheader dense slot="progress">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <p>Loading Songs.</p>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <p>It may take few minutes at first. Please Hold On.</p>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <template slot="items" slot-scope="props">
              <tr
                :class="{ 'primary': (playingIndex === props.item.index) }" 
                @click="playSong(props.item, props.item.index)">
                <td>{{ props.item.title }}</td>
              <td>{{ props.item.artist }}</td>
              <td>{{ props.item.album }}</td>
              </tr>
            </template>
            <template slot="footer">
              <td colspan="100%">
                <strong>{{ playlist.length }} Songs.</strong>
              </td>
            </template>
          </v-data-table>
          <!-- <v-list two-line subheader dense>
            <v-list-tile avatar v-if="noFiles && !listLoading">
              <v-list-tile-avatar>
                <img src="static/z_no_album_art.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p>No Tracks in list.</p>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <p>Pick a Directory to load Songs.</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-if="listLoading">
              <v-list-tile-avatar>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p>Loading Songs.</p>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <p>It may take few minutes at first. Please Hold On.</p>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-if="!noFiles" v-for="(track, index) in songs" :key="index">
              <v-list-tile-avatar>
                <img :src="track.cover">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ track.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ track.artist }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="playSong(track, index)" :class="{ 'primary': (playingIndex === index) }">
                  <v-icon v-if="playingIndex === index" color="grey lighten-1">pause</v-icon>
                  <v-icon v-else color="grey lighten-1">play_arrow</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list> -->
        </v-card-text>
      </v-card>

      <player
        :file="audioFile"
        :albumArt="albumArt"
        :songName="songName"
        :songArtist="songArtist"
        :canPlay="canPlay"
        :autoPlay="true"
        :ended="ended"
        v-show="songLoaded"
      />
    </div>
  </v-slide-x-transition>
</template>

<script type="text/javascript">
import { readDir } from '@/helpers/fileActions'
// import NodeID3 from 'node-id3'

import Worker from './myworker.worker.js'

import player from '@/components/player'

const worker = new Worker()
export default {
  name: 'tracks',
  components: {
    player
  },
  computed: {
    noFiles () {
      return (!this.songs.length > 0)
    }
  },
  data: () => ({
    audioFile: 'static/',
    albumArt: '',
    songName: '',
    songArtist: '',
    songs: [],
    playlist: [],
    headers: [
      { text: 'Title', align: 'center', value: 'title' },
      { text: 'Artist', align: 'center', value: 'artist' },
      { text: 'Album', align: 'center', value: 'album' }
    ],
    listLoading: false,
    playingIndex: null,
    songLoaded: false
  }),
  methods: {
    openDir () {
      this.$refs.dirInput.click()
    },
    canPlay (v) {
      if (v) {
        this.songLoaded = true
      }
    },
    ended () {
      let index = this.playingIndex
      index++
      this.playSong(this.playlist[index], index)
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
            this.songs = data
            this.playlist = data
            this.listLoading = false
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    playSong (info, index) {
      let fileBuffer = Buffer.from(info.fileBuffer)
      const dataURI = fileBuffer.toString('base64')
      if (dataURI) {
        this.audioFile = `data:audio/mp3;base64,${dataURI}`
        if (this.audioFile) {
          this.songName = info.title
          this.songArtist = info.artist
          this.albumArt = info.cover
          this.playingIndex = index
          this.songLoaded = false
          this.songs[index]['dataURI'] = this.audioFile
        }
      }
    }
  }
}
</script>
