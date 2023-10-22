const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Let's test if mandatory env variables are available
if (!process.env.NODE_ENV) {
  throw "no NODE_ENV env variable"
}

if (!process.env.GEN_DIR) {
  throw "no GEN_DIR env variable : the directory where we will generate the WebSite (all html, css and js files)."
}

console.log(`//// Build for ${process.env.NODE_ENV} environment ////`)
const getWebPackConfig = (dirname, resolveAlias, extraPlugins = [], outputPath = null) => {
  const config = {
    optimization: {
      runtimeChunk: 'single',
      usedExports: true,
      minimize: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          }
        }
      }
    },
    output: {
      filename: '[name].[chunkhash].bundle.js',
      path: outputPath || process.env.GEN_DIR
    },
    entry: {
      index: path.join(dirname, './src/ts/index.tsx')
    },
    node: {
      // fs: 'empty',
      // module: 'empty',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
      alias: resolveAlias
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules|BackOffice|stories)/,
          loader: 'ts-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|BackOffice|stories)/,
          loader: 'babel-loader',
          options: {
            compact: true,
          },
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|BackOffice|stories)/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|BackOffice|stories)/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg|webp)$/,
          use: {
            loader: ['url-loader', 'file-loader'],
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            },
          }
        }
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.PRODUCTION': true,
        'process.env.WWW_URL': `"${process.env.WWW_URL}"`,
        'process.env.WWW_VERSION': `"${process.env.WWW_VERSION}"`,
        'process.env.GOOGLE_CLIENT_ID': `"${process.env.GOOGLE_CLIENT_ID}"`,
        'process.env.GOOGLE_API_KEY': `"${process.env.GOOGLE_API_KEY}"`,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  }

  // If we have extraPlugins we push them into the list
  extraPlugins.forEach(plugin => config.plugins.push(plugin))

  return config
}

module.exports = getWebPackConfig
