const spawn = require('cross-spawn')
const path = require('path')

// regex pattern to extract test files
const pattern = `^(?!.*.d.tsx?$).*.[tj]sx?$`
const result = spawn.sync(path.normalize('./node_modules/.bin/jest'), [pattern], { stdio: 'inherit' })

process.exit(result.status)
