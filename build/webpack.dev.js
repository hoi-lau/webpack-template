const commonConfig = require('./webpack.common')
const webpackMerge = require('webpack-merge')
const readEnv = require('./utils/readEnv')
const webpack = require('webpack')

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: false,
    host: 'localhost',
    port: 5000,
    hot: true,
    hotOnly: true,
    contentBase: '/',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // plugins: [new webpack.DefinePlugin(readEnv(['.env', '.env.dev']))]
  plugins: [
    new webpack.DefinePlugin(readEnv('.env.dev')),
    new webpack.HotModuleReplacementPlugin()
  ]
})
