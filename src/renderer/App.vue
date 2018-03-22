<template>
  <v-app dark>
    <app-bar />
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
    }
  }
</script>

<style>
  /* CSS */
</style>
