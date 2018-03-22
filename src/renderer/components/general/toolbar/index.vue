<template lang="html">
  <div>
    <v-toolbar color="primary" dark extended app dense>
      <!-- <v-slide-y-transition mode="in-out"> -->
        <v-toolbar-title v-if="!isSearch">Page title</v-toolbar-title>
        <v-spacer v-if="!isSearch"></v-spacer>
        <v-btn icon v-if="!isSearch" @click="openSearch">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon v-if="!isSearch">
          <v-icon>more_vert</v-icon>
        </v-btn>
      <!-- </v-slide-y-transition> -->
      <v-slide-y-transition mode="out-in">
        <v-text-field
          prepend-icon="search"
          append-icon="close"
          :append-icon-cb="closeSearch"
          label="Search"
          solo-inverted
          class="mx-3"
          flat
          v-if="isSearch"
          auto-focus
        ></v-text-field>
      </v-slide-y-transition>
      <v-tabs
        color="primary"
        slot="extension"
        v-model="tab"
        align-with-title
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'toolbar',
  data: () => ({
    isSearch: false,
    tab: null,
    items: [
      'tracks', 'albums', 'artists'
    ]
  }),
  methods: {
    openSearch () {
      this.isSearch = true
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
    }
  }
}
</script>
