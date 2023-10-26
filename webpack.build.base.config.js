const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Let's test if mandatory env variables are available
if (!process.env.NODE_ENV) {
  throw "no NODE_ENV env variable"
}

console.log(`//// Build for ${process.env.NODE_ENV} environment ////`)
const getWebPackConfig = (dirname, resolveAlias, extraPlugins = [], outputPath = null) => {
  if (!outputPath && !process.env.GEN_DIR) {
    throw "no GEN_DIR env variable : the directory where we will generate the WebSite (all html, css and js files)."
  }
  const config = {
    optimization: {
      runtimeChunk: 'single',
      usedExports: true,
      minimize: true,
      splitChunks:
        {
          minSize: 17000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: "_",
          enforceSizeThreshold: 30000,
          cacheGroups: {
           common: {
            test: /[\\/]node_modules[\\/]/,
            priority: -5,
            reuseExistingChunk: true,
            chunks: "initial",
            name: "vendor_common",
            minSize: 0,
           },
           default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
           },
           // we are opting out of defaultVendors, so rest of the node modules will be part of default cacheGroup
           defaultVendors: false,
           reactPackage: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: 'vendor_react',
            chunks: "all",
            priority: 10,
           },
           finalFormPackage: {
            test: /[\\/]node_modules[\\/](final-form|react-final-form)[\\/]/,
            name: 'vendor_finalform',
            chunks: "all",
            priority: 10,
           }
          },
         },
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
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            },
          }
        },
        {
          test: /\.(svg|jpg|png|webp)$/,
          use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'img/',
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
