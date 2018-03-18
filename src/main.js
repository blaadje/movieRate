import { app, BrowserWindow } from 'electron'
import { enableLiveReload } from 'electron-compile'
import path from 'path'

enableLiveReload()

console.log(path.join(__dirname, 'index.html')) // eslint-disable-line no-console

app.on('ready', function () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    titleBarStyle: 'hidden-inset'
  })
  win.setMenu(null)
  win.loadURL(path.join('file://', __dirname, 'index.html'))
})
