<template>
  <v-app
    :dark="darkApp"
  >
    <app-bar
      :darkApp="darkApp"
    />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import toolbar from '@/components/general/toolbar'

  export default {
    name: 'muzzy-desktop',
    components: {
      'app-bar': toolbar
    },
    data: () => ({
      darkApp: true
    })
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
</style>
