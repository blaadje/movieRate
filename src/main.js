const { BrowserWindow, app } = require('electron')

let win

function createWindow() {
  /**
   * Initial window options
   */
  win = new BrowserWindow({
    width: 1450,
    height: 900,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
    },
    titleBarStyle: 'hidden-inset',
  })

  const loading = new BrowserWindow({
    width: 330,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: false,
    },
    frame: false,
    modal: true,
    parent: win,
  })

  loading.setIgnoreMouseEvents(true)

  loading.once('show', () => {
    win.webContents.once('dom-ready', () => {
      win.show()
      loading.hide()
      loading.close()
    })
    win.loadURL(`file:///${__dirname}/index.html`)
    win.setMenu(null)
  })

  loading.loadURL(`file:///${__dirname}/loader.html`)
  loading.show()

  win.on('closed', () => {
    win = null
  })

  if (process.env.NODE_ENV === 'development') {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS).catch(err => {
      console.error('An error occurred: ', err) // eslint-disable-line no-console
    })

    installExtension(REDUX_DEVTOOLS).catch(err => {
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
