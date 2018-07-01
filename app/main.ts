import { app, BrowserWindow, ipcMain } from 'electron'
import { constants } from './modules/constants'

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
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS', 'REACT_PERF']

    return Promise.all(
      extensions.map(name =>
        installer.default(installer[name], !!process.env.UPGRADE_EXTENSIONS)
      )
    )
  }
  return Promise.resolve([])
}

app.on('ready', () =>
  installExtensions().then(async () => {
    const windowOptions = Object.assign(
      constants.windows.parent,
      constants.windows.login
    )
    windowObject = new BrowserWindow(windowOptions)

    windowObject.loadURL(`${constants.basePath}${windowOptions.path}`)

    if (process.env.NODE_ENV === 'development') {
      windowObject.webContents.openDevTools({
        mode: 'detach'
      })
    }
  })
)

ipcMain.on('showWindow', (event: any) => {
  try {
    windowObject.show()
    windowObject.focus()
    event.returnValue = true
  } catch (error) {
    event.returnValue = error
  }
})
