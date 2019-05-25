import { app, BrowserWindow, ipcMain } from 'electron'
import { constants, oauth } from './modules/constants'
import { Profiler } from './modules/profiler'

let windowObject: Electron.BrowserWindow
let githubObject: Electron.BrowserWindow

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

app.commandLine.appendSwitch('--disable-http-cache')
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
    const windowOptions = {
      ...constants.windows.parent,
      ...constants.windows.login
    }
    windowObject = new BrowserWindow(windowOptions)

    windowObject.setMenuBarVisibility(false)

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

/**
 * try to show Github Oauth login window and make profile for authorized users.
 * Also, return false in case of authorization failed.
 *
 * This process needs to be called over IPC.
 */
ipcMain.on('oauth', (event: any) => {
  const profiler = new Profiler()
  const githubOptions = {
    ...constants.windows.parent,
    ...constants.windows.github
  }
  githubObject = new BrowserWindow(githubOptions)
  githubObject.once('ready-to-show', () => {
    githubObject.show()
  })
  githubObject.once('closed', () => {
    windowObject.focus()
    githubObject = null
  })

  githubObject.setMenuBarVisibility(false)
  githubObject.webContents.addListener(
    'did-navigate',
    (e: any, url: string) => {
      // check authorization is successful
      if (url.indexOf(oauth.parameters.callback) === 0) {
        let navigatedURL: URL = new URL(url)
        let code: any = navigatedURL.searchParams.get('code')
        profiler.github
          .exchanger(code)
          .then((response: any) => {
            event.reply('oauthResult', {
              token: `${response.data.token_type} ${
                response.data.access_token
              }`,
              user_type: 'authorized',
              skipLogin: true,
              lastSyncDate: new Date()
            })
            githubObject.close()
          })
          .catch(() => {
            event.reply('oauthResult', false)
          })
      }
    }
  )

  githubObject.loadURL(githubOptions.path)
})
