export default {
  singleArtistDialog (artist) {
    console.log('its clicked')
    this.dialog = true
    this.singleArtist = artist

    localStorage.setItem('singleArtist', JSON.stringify(artist))

    this.$router.push('/artist')
  }
}
