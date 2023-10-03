const config = require('./webpack.build.config')

console.log('//// => Activate Debug mode ////')
// We mutate the build config :
config.optimization = {
  minimize: false,
  usedExports: false
}
config.devtool = 'inline-source-map'
config.mode = 'development'
config.module.rules[1].options.compact = false

module.exports = config
