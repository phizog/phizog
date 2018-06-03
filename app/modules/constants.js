const isRenderer = require('is-electron-renderer')
const { app } = isRenderer ? require('electron').remote : require('electron')
const { join } = require('path')

module.exports = {
  profilePath: join(app.getPath('userData'), 'phizog.json'),
  profileTemplatePath: join(__dirname, '..', 'resources', 'phizog.json')
}
