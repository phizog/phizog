const ts = require('typescript')
const tsConfig = require('../tsconfig.json')

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      // transpile .ts, .tsx files to es5
      return ts.transpile(src, tsConfig.compilerOptions, path, [])
    }
    return src
  }
}
