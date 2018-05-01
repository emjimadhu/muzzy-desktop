import os from 'os'

export default {
  dialog (v) {
    if (v) {
      this.appName = this.$electron.remote.app.getName()
      this.appVersion = this.$electron.remote.app.getVersion()
      const osName = os.platform()
      if (osName === 'win32') {
        this.appOS = 'Windows'
      } else if (osName === 'linux') {
        this.appOS = 'Linux'
      } else if (osName === 'darwin') {
        this.appOS = 'MacOS'
      }
      this.appPath = this.$electron.remote.app.getAppPath()
    }
  }
}
