const {app} = require('electron')
const {BrowserWindow} = require('electron')
import {enableLiveReload} from 'electron-compile'

enableLiveReload()

app.on('ready', function(){
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: true,
        titleBarStyle : 'hidden-inset'
    })
    win.setMenu(null)
    win.webContents.openDevTools({detach:true})
    win.loadURL('file://' + __dirname + '/index.html')
})