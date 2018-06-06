const spawn = require('cross-spawn')
const path = require('path')

// regex pattern to extract test files
const result = spawn.sync(
  path.normalize('./node_modules/jest/bin/jest.js'),
  { stdio: 'inherit' }
)

process.exit(result.status)
