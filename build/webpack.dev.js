const commonConfig = require('./webpack.common')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge.merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: false,
    host: 'localhost',
    port: 5000,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})