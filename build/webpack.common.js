const { pathResolve, publicPath } = require('./utils')
const readEnv = require('./utils/readEnv')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  context: publicPath,
  entry: {
    main: pathResolve('src/index.js')
  },
  output: {
    path: pathResolve('dist'),
    hashDigestLength: 8,
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: pathResolve('public/favicon.ico'),
      filename: 'index.html',
      template: pathResolve('public/index.html'),
      title: 'my app'
    }),
    // copy src/static to dist/static
    new CopyWebpackPlugin({
      patterns: [
        {
          from: pathResolve('src/static'),
          to: './static'
        }
      ]
    }),
    // define global variable
    new webpack.DefinePlugin(readEnv('.env'))
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
}
