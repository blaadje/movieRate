const path = require('path')

module.exports = {
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ['@assets']: path.resolve(__dirname, '../src/assets/'),
      ['@components']: path.resolve(__dirname, '../src/components'),
      ['@containers']: path.resolve(__dirname, '../src/containers'),
      ['@views']: path.resolve(__dirname, '../src/views'),
      ['@core']: path.resolve(__dirname, '../src/core'),
      ['@settings']: path.resolve(__dirname, '../src/settings'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff)$/,
        include: path.resolve(__dirname, '../src/assets'),
        use: {
          loader: 'file-loader',
          options: {},
        },
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/images'),
        use: {
          loader: 'svgo-loader',
          options: {
            externalConfig: 'svgo-config.yml',
          },
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          query: {
            compact: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
}
