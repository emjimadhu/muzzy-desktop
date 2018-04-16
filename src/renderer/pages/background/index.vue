<template lang="html">

</template>

<script type="text/javascript">
export default {
  name: 'background',
  created () {
    this.$electron.ipcRenderer.on('background-start', (startTime) => {
      console.log('background started')
      this.$electron.ipcRenderer.send('background-response', {
        result: 'this is background response after 2 seconds',
        startTime: startTime
      })
    })
  }
}
</script>
