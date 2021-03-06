/* Note: is-electron-renderer required in commongjs way because it doesn't
 * have type defination.
 */
const isRenderer = require('is-electron-renderer')
import { app, remote } from 'electron'
import { join } from 'path'
import { queryString } from './util'
let currentApp = isRenderer ? remote.app : app

export const meta = {
  title: 'Phizog'
}

export const oauth = {
  url: 'https://github.com/login/oauth/authorize',
  parameters: {
    client_id: '6ed184fcdf90a8ab84d6', // Phizog OAuth client id, created by owners
    callback: 'https://phizog.github.io',
    scope: 'gist',
    allow_signup: true
  },
  exchanger: 'https://phizog.github.io/exchanger.txt'
}

export const constants = {
  profile: {
    filename: 'phizog.json',
    path: join(currentApp.getPath('userData'), 'phizog.json')
  },
  basePath: `file://${join(__dirname, '.')}/app.html`,
  windows: {
    /* Note: the path parameter MUST be a hashbang format, Because of some
     * securty roles which required by Chromium
     */
    parent: {
      title: meta.title,
      show: true,
      path: '#',
      backgroundColor: '#141414',
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      }
    },
    main: {
      width: 1024,
      height: 600,
      path: '#',
      resizable: true
    },
    login: {
      width: 360,
      height: 480,
      resizable: false,
      path: '#login'
    },
    github: {
      title: 'Github OAuth Login',
      width: 800,
      height: 600,
      resizable: false,
      backgroundColor: '#ffffff',
      show: false,
      path: `${oauth.url}?${queryString(oauth.parameters)}`
    }
  },
  api: {
    baseURL: 'https://api.github.com'
  },
  notification: {
    general: {
      displayTime: 3500
    },
    login: {
      successful: {
        title: `Congratulations, You logged in ${meta.title}.`
      },
      failed: {
        title: `Oops! log in to application failed. You can try again later`
      }
    }
  }
}
