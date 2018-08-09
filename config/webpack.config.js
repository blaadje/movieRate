const path = require('path')
const port = process.env.PORT || 8080
const publicPath = `http://localhost:${port}/dist`

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      images: path.resolve(__dirname, '../src/assets/images/'),
      components: path.resolve(__dirname, '../src/components'),
      containers: path.resolve(__dirname, '../src/containers'),
      views: path.resolve(__dirname, '../src/views'),
      core: path.resolve(__dirname, '../src/core'),
      settings: path.resolve(__dirname, '../src/settings')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|svg|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { compact: true }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "loader";',
              includePaths: [
                path.resolve(__dirname, '../src/assets/style')
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    publicPath,
    filename: 'index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port,
    publicPath,
    compress: false,
    noInfo: false,
    overlay: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    }
  }
}
