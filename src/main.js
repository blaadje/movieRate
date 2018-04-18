import { app, BrowserWindow } from 'electron'
import { enableLiveReload } from 'electron-compile'

if (process.env.NODE_ENV === 'development') enableLiveReload({ strategy: 'react-hmr' })

let win

function createWindow () {
  /**
   * Initial window options
   */
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    transparent: true
    // titleBarStyle: 'hidden-inset'
  })
  win.openDevTools({ detach: true })
  win.setMenu(null)
  win.loadURL(`file:///${__dirname}/index.html`)

  win.on('closed', () => {
    win = null
  })

  if (process.env.NODE_ENV === 'development') {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS)
      .catch((err) => {
        console.error('An error occurred: ', err) // eslint-disable-line no-console
      })
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
