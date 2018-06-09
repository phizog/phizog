const spawn = require('cross-spawn')
const path = require('path')
const { exec } = require('child_process')

// regex pattern to extract test files
const result = spawn.sync(
  path.normalize('./node_modules/jest/bin/jest.js'),
  ['--maxWorkers=4'],
  { stdio: 'inherit' }
)

// remove temporary files after finishing process
exec('rm $PWD/tmp', (error, stdout, stderr) => {
  if (error) throw error
  process.exit(result.status)
})
