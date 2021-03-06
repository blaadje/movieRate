const path = require('path')
const config = require('../webpack.base')
const fs = require('fs')
const port = process.env.PORT || 8080
const publicPath = `https://localhost:${port}/dist`

module.exports = {
  ...config,
  output: {
    publicPath,
    filename: 'index.js',
    pathinfo: false,
  },
  target: 'electron-renderer',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port,
    publicPath,
    compress: true,
    clientLogLevel: 'silent',
    noInfo: false,
    overlay: true,
    stats: 'minimal',
    // http2 not supported for node > 10.x.x
    // https://github.com/expressjs/express/pull/3730
    http2: false,
    https: {
      cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
      key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
    },
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },
}
