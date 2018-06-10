/* Note: is-electron-renderer required in commongjs way because it doesn't
 * have type defination.
 */
const isRenderer = require('is-electron-renderer')
import { app, remote } from 'electron'
import { join } from 'path'
let currentApp = isRenderer ? remote.app : app

export const constants = {
  profilePath: join(currentApp.getPath('userData'), 'phizog.json'),
  profileTemplatePath: join(__dirname, '..', 'resources', 'phizog.json'),
  basePath: `file://${join(__dirname, '.')}/app.html`,
  windows: {
    /* Note: the path parameter MUST be a hashbang format, Because of some
     * securty roles which required by Chromium
     */
    parent: {
      show: false,
      frame: false,
      path: '#'
    },
    main: {
      width: 1024,
      height: 768,
      path: '#'
    },
    login: {
      width: 300,
      height: 400,
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
    }
  }
}
