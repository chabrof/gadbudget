const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Load env vars in varisous .env files
const dotenv = require('dotenv-flow')
dotenv.config()

// The dirName will be the directory of this current script
const dirName = __dirname

const extraPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve('src/ejs/', 'default.ejs'),
    inject: false,
    hash: true,
    title: 'Gad\'Budget'
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'assets' },
      // { from: 'config/pages.json' }
    ]
  }),
  /*{ // Removing unused chunks after emit
    apply: (compiler) => {
      // Called after emitting assets to output directory
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        const CHUNKS_FOLDER = 'static/ui/js/chunks/';
        // List of used chunks
        const chunks = compilation.chunks.map(
          chunk => chunk.files[0]
        ).filter(
          chunk => chunk.startsWith(CHUNKS_FOLDER)
        ).map(
          chunk => chunk.slice(CHUNKS_FOLDER.length)
        )

        // Substring to exclude used chunks
        const chunksExcludingSubstr = chunks.map(
          chunk => `-not -name ${chunk}`
        ).join(' ')

        exec(
          `find ${CHUNKS_FOLDER} -type f ${chunksExcludingSubstr} -delete`,
          (err, stdout, stderr) =>
          {
            if (stderr) process.stderr.write(stderr);
          }
        );
      });
    }
  }*/
  // new CleanObsoleteChunks()
  /*{
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
  }*/
]
const resolveAlias = {
  '@wwwTs': path.join(__dirname, './src/ts'),
  '@wwwScss': path.join(__dirname, './src/scss')
}

const getWebPackConfig = require('./webpack.build.base.config')
const config = getWebPackConfig(dirName, resolveAlias, extraPlugins, dirName + '/public')

module.exports = config
