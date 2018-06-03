const { app, BrowserWindow } = require('electron')
const Profiler = require('./modules/profiler')

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development') {
  // add node_module path to global paths
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer')
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ]

    return Promise.all(extensions.map(name => installer.default(installer[name], !!process.env.UPGRADE_EXTENSIONS)))
  }
  return Promise.resolve([])
}

app.on('ready', () =>
  installExtensions()
    .then(() => {
      mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        frame: false
      })

      mainWindow.loadURL(`file://${__dirname}/app.html`)

      mainWindow.webContents.on('did-finish-load', () => {
        let p = new Profiler()
        console.log(p.path)

        mainWindow.show()
        mainWindow.focus()
      })

      mainWindow.webContents.openDevTools({
        mode: 'bottom'
      })
      if (process.env.NODE_ENV === 'development') {
      }
    }))
