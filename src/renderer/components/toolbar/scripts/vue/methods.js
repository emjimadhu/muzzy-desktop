export default {
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
}
