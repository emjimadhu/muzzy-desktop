export default class Helpers {
  static formatTime (seconds) {
    const time = new Date(seconds * 1000).toISOString().substr(14, 5)
    return time
  }
  static formatTimeWithHour (seconds) {
    const time = new Date(seconds * 1000).toISOString().substr(11, 8)
    return time
  }
}
