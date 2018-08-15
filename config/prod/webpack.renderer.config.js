const path = require('path')
const { dependencies } = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../webpack.base')

let rendererConfig = {
  ...config,
  mode: 'production',
  entry: {
    renderer: path.join(__dirname, '../src/index.js')
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: false
    })
  ],
  target: 'electron-renderer'
}

module.exports = rendererConfig
