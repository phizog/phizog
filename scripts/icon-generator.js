const generator = require('typescript-react-svg-icon-generator')
const path = require('path')
const config = {
  svgDir: path.join(__dirname, '..', 'app', 'resources', 'icons', 'svgs'),
  destination: `${path.join(__dirname, '..', 'app', 'resources', 'icons')}/index.tsx`
}
generator(config)
