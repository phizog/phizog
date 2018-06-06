import { app, BrowserWindow } from 'electron'
// const Profiler = require('./modules/profiler')

let mainWindow: Electron.BrowserWindow

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer')
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

    return Promise.all(
      extensions.map(name =>
        installer.default(installer[name], !!process.env.UPGRADE_EXTENSIONS)
      )
    )
  }
  return Promise.resolve([])
}

app.on('ready', () =>
  installExtensions().then(() => {
    mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      frame: false
    })

    mainWindow.loadURL(`file://${__dirname}/app.html`)

    mainWindow.webContents.on('did-finish-load', () => {
      // let p = new Profiler({
      //   user_type: 'guest'
      // })
      // console.log(p.data)

      mainWindow.show()
      mainWindow.focus()
    })

    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools({
        mode: 'bottom'
      })
    }
  })
)
