/* is-electron-renderer required in commongjs way because it doesn't
 * have type defination.
 */
const isRenderer = require('is-electron-renderer')
import { app, remote } from 'electron'
import { join } from 'path'

let currentApp = isRenderer ? remote.app : app

export const constants = {
  profilePath: join(currentApp.getPath('userData'), 'phizog.json'),
  profileTemplatePath: join(__dirname, '..', 'resources', 'phizog.json')
}
