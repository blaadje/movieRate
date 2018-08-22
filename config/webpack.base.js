const path = require('path')

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
    rules: [{
      test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|svg|woff)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        query: {
          compact: true
        }
      }
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, 
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            data: '@import "loader";',
            includePaths: [
              path.resolve(__dirname, '../src/assets/style')
            ]
          }
        }
      ]}
    ]
  }
}
