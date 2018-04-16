export default {
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
