'use strict'
const { ipcRenderer } = require('electron')

console.log('this is background')
window.onload = function () {
  ipcRenderer.on('background-start', (startTime) => {
    console.log('background started')
    ipcRenderer.send('background-response', {
      result: 'this is background response after 2 seconds',
      startTime: startTime
    })
  })
}
