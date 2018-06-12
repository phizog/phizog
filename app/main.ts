import { app, BrowserWindow } from 'electron'
import { constants } from './modules/constants'
import { Profiler } from './modules/profiler'

let windowObject: Electron.BrowserWindow

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

// create profiler instance
let profile = new Profiler()

app.on('ready', () =>
  installExtensions().then(async () => {
    const windowOptions = Object.assign(
      constants.windows.parent,
      (await profile.pingtoken()) // check token is valid and didn't expire
        ? constants.windows.main
        : constants.windows.login
    )
    windowObject = new BrowserWindow(windowOptions)

    windowObject.loadURL(`${constants.basePath}${windowOptions.path}`)

    windowObject.webContents.on('did-finish-load', () => {
      windowObject.show()
      windowObject.focus()
    })

    if (process.env.NODE_ENV === 'development') {
      windowObject.webContents.openDevTools({
        mode: 'detach'
      })
    }
  })
)
