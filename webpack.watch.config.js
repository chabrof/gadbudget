const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Load env vars in varisous .env files
const dotenv = require('dotenv-flow')
dotenv.config()

// The dirName will be the directory of this current script
const dirName = __dirname

const extraPlugins = [
  new CopyWebpackPlugin({
    patterns: [
      { from: 'assets' },
      // { from: 'config/pages.json' }
    ]
  })
]
const resolveAlias = {
  '@wwwTs': path.join(__dirname, './src/ts'),
  '@wwwScss': path.join(__dirname, './src/scss')
}

const getWebPackConfig = require('./webpack.watch.base.config')
const config = getWebPackConfig(dirName, resolveAlias, extraPlugins)

module.exports = config
