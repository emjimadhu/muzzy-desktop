export default function () {
  this.$store.watch(
    function (getters) {
      return getters.currentSongEnded
    },
    function () {
      this.ended()
    },
    {
      deep: true
    }
  )
}
