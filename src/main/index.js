'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// let backgroundWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// const backgroundURL = process.env.NODE_ENV === 'development'
//   ? `http://localhost:9080/#/background`
//   : `file://${__dirname}/background.html`

function createMainWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false,
    webPreferences: {
      nodeIntegrationInWorker: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// function createBackgroundWindow () {
//   backgroundWindow = new BrowserWindow({
//     show: true
//   })
//
//   backgroundWindow.loadURL(backgroundURL)
//
//   // setTimeout(() => {
//   //   backgroundWindow.loadURL(`file://${__dirname}/background.html`)
//   // }, 2000)
//
//   backgroundWindow.on('closed', () => {
//     backgroundWindow = null
//   })
// }

app.on('ready', () => {
  createMainWindow()
  // createBackgroundWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

// ipcMain.on('background-response', (event, payload) => mainWindow.webContents.send('background-response', payload))
//
// ipcMain.on('background-start', (event, payload) => backgroundWindow.webContents.send('background-start', payload))

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
