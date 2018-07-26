/* Note: is-electron-renderer required in commongjs way because it doesn't
 * have type defination.
 */
const isRenderer = require('is-electron-renderer')
import { app, remote } from 'electron'
import { join } from 'path'
let currentApp = isRenderer ? remote.app : app

export const constants = {
  meta: {
    title: 'Phizog'
  },
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
      show: false,
      path: '#',
      backgroundColor: '#141414'
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
    }
  },
  oauth: {
    url: 'https://github.com/login/oauth/authorize',
    parameters: {
      client_id: '6ed184fcdf90a8ab84d6', // Phizog OAuth client id, created by owners
      callback: 'https://phizog.github.io',
      scope: 'gist',
      allow_signup: true
    },
    exchanger: 'https://phizog.github.io/exchanger.txt'
  },
  api: {
    baseURL: 'https://api.github.com'
  }
}
