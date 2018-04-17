<template>
  <v-app
    :dark="darkApp"
  >
    <app-bar />

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <player
      v-show="$store.getters.currentSongFile"
    />

    <transition name="fade">
      <splash
        v-if="!appLoaded"
      />
    </transition>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  import toolbar from '@/components/toolbar'
  import player from '@/components/player'
  import splash from '@/components/splash'

  export default {
    name: 'muzzy-desktop',
    components: {
      'app-bar': toolbar,
      player,
      splash
    },
    computed: {
      ...mapGetters({
        darkApp: 'darkApp'
      })
    },
    data: () => ({
      appLoaded: false
    }),
    mounted () {
      setTimeout(() => {
        this.appLoaded = true
      }, 5000)
    }
  }
</script>

<style>
/* CSS */
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
