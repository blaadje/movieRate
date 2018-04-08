import { app, BrowserWindow } from 'electron'
import { enableLiveReload } from 'electron-compile'

if (process.env.NODE_ENV === 'development') enableLiveReload()

let win

function createWindow () {
  /**
   * Initial window options
   */
  win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    titleBarStyle: 'hidden-inset'
  })
  win.openDevTools({ detach: true })
  win.setMenu(null)
  win.loadURL(`file:///${__dirname}/index.html`)

  win.on('closed', () => {
    win = null
  })
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
