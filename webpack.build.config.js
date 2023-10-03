const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Load env vars in varisous .env files
const dotenv = require('dotenv-flow')
dotenv.config()

// The dirName will be the directory of this current script
const dirName = __dirname

const extraPlugins = [
  /* new StatsWriterPlugin({
    filename: path.join(__dirname, './webpack-stats.json'),
    stats: {
      assets: true,
      chunks: true,
      modules: true
    }
  }), */
  new CopyWebpackPlugin({
    patterns: [
      { from: 'assets' },
      // { from: 'config/pages.json' }
    ]
  }),
  {
    apply: compiler => { // We create a dummy plugin with hooks on the 'done' event in order to extract generated files
      compiler.hooks.done.tap("My-FinalizePlugin", stats => {
        // Extract JS and CSS file names (for late SSG Generation)
        const cssFiles = []
        const jsFiles = []
        Array.from(stats.compilation.chunks.values())
          .map(chunk => {
            Array.from(chunk.files.values()).forEach(
              fileName => {
                const extensionWithDot = fileName.match(/\.[0-9a-z]+$/i)[0]
                if (extensionWithDot === '.css') cssFiles.push(fileName)
                if (extensionWithDot === '.js' &&
                  (
                    // We add only "classical" bundle :
                    //   the dynamics lazy loaded bundles are not included
                    fileName.indexOf('index') !== -1 ||
                    fileName.indexOf('vendors') !== -1 ||
                    fileName.indexOf('runtime') !== -1
                  )
                ) jsFiles.push(fileName)
              }
            )
          })
        console.log('js', jsFiles)
        console.log('css', cssFiles)
        let data = JSON.stringify({
          'js': jsFiles,
          'css': cssFiles
        })
        const dir = `${process.env.GEN_DIR}/.ssg`
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        fs.writeFileSync(`${dir}/gen-chunks.json`, data)
      })
    }
  }
]
const resolveAlias = {
  '@wwwTs': path.join(__dirname, './src/ts'),
  '@wwwScss': path.join(__dirname, './src/scss')
}

const getWebPackConfig = require('./webpack.build.base.config')
const config = getWebPackConfig(dirName, resolveAlias, extraPlugins)

module.exports = config
