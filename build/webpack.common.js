const { pathResolve, publicPath } = require('./utils')
const readEnv = require('./utils/readEnv')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: publicPath,
  entry: {
    app: pathResolve('src/index.js')
  },
  target: 'web',
  output: {
    path: pathResolve('dist'),
    hashDigestLength: 8,
    filename: '[name].[contenthash].js',
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
    new webpack.DefinePlugin(readEnv('.env')),
    new VueLoaderPlugin({
      verbose: true
    })
  ],

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.vue$/i,
        use: {
          loader: 'vue-loader',
          options: {
            preserveWhitespace: false,
            optimizeSSR: false
          }
        }
      }
    ]
  }
}
