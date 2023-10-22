const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log("process.env", process.env)

const getWebPackConfig = (dirname, resolveAlias, extraPlugins = []) => {
  const config = {
    output: {
      filename: 'bundle.js',
      path: path.join(dirname, './public'),
    },
    entry: {
      index: path.join(dirname, './src/ts/index.tsx'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', /* '.scss', */ '.css'],
      alias: resolveAlias
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules|stories|nodeServer)/,
          loader: 'ts-loader' },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|stories|nodeServer)/,
          loader: 'babel-loader',
          options: { compact: false },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
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
    ]},
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PRODUCTION': 'false',
        'process.env.WWW_URL': `"${process.env.WWW_URL}"`,
        'process.env.WWW_VERSION': `"${process.env.WWW_VERSION}"`,
        'process.env.GOOGLE_CLIENT_ID': `"${process.env.GOOGLE_CLIENT_ID}"`,
        'process.env.GOOGLE_API_KEY': `"${process.env.GOOGLE_API_KEY}"`,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('src/ejs/', 'default.ejs'),
        inject: false,
        hash: true,
        title: 'Gad\' Budget'
      })
    ],
    devServer: { // This server simulates Apache on your local machine
      static: {
        directory: path.join(dirname, './assets'),
      },
      historyApiFallback: true,
    }
  }

  // If we have extraPlugins we push them into the list
  extraPlugins.forEach(plugin => config.plugins.push(plugin))

  return config
}
module.exports = getWebPackConfig
