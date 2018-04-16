<template lang="html">
  <div>
    <v-toolbar
      dense
      app
      style="-webkit-app-region: drag;"
    >
        <v-toolbar-title class="pr-4">
          <v-icon>music_video</v-icon>
        </v-toolbar-title>
        <v-tabs
          v-model="tab"
          v-if="!isSearch"
          slider-color="primary"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="item in items" :key="item" style="-webkit-app-region: no-drag;">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-spacer v-if="!isSearch"></v-spacer>
        <v-slide-y-transition mode="in-out">
          <v-btn icon v-if="!isSearch" @click="openSearch" style="-webkit-app-region: no-drag;">
            <v-icon>search</v-icon>
          </v-btn>
        </v-slide-y-transition>
        <v-slide-y-transition mode="out-in">
          <v-text-field
            prepend-icon="search"
            append-icon="close"
            :append-icon-cb="closeSearch"
            label="Search"
            solo-inverted
            flat
            v-if="isSearch"
            auto-focus
            style="-webkit-app-region: no-drag;"
            ref="search"
          ></v-text-field>
        </v-slide-y-transition>
        <v-menu offset-y bottom left style="-webkit-app-region: no-drag;">
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list two-line subheader>
            <v-subheader>Global Theme</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Dark</v-list-tile-title>
                <v-list-tile-sub-title>Dark Flovared.</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-checkbox v-model="darkAppModel"></v-checkbox>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn icon @click="minimize" style="-webkit-app-region: no-drag;">
          <v-icon small>remove</v-icon>
        </v-btn>
        <v-btn icon @click="maximize" style="-webkit-app-region: no-drag;">
          <v-icon small>check_box_outline_blank</v-icon>
        </v-btn>
        <v-btn icon @click="close" style="-webkit-app-region: no-drag;">
          <v-icon small>close</v-icon>
        </v-btn>
    </v-toolbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'toolbar',
  props: {
    darkApp: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isSearch: false,
    tab: null,
    items: [
      'tracks', 'albums', 'artists'
    ],
    darkAppModel: this.darkApp
  }),
  methods: {
    minimize () {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      window.minimize()
    },
    maximize () {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    },
    close () {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      window.close()
    },
    openSearch () {
      this.isSearch = true
      this.$nextTick(() => this.$refs.search.focus())
    },
    closeSearch () {
      this.isSearch = false
    }
  },
  watch: {
    tab (v) {
      const routeTo = parseInt(v)
      switch (routeTo) {
        case 0:
          this.$router.push({
            name: 'tracks'
          })
          break
        case 1:
          this.$router.push({
            name: 'albums'
          })
          break
        case 2:
          this.$router.push({
            name: 'artists'
          })
          break
        default:
          this.$router.push({
            name: 'tracks'
          })
      }
    },
    darkApp (v) {
      console.log(v)
    }
  }
}
</script>
