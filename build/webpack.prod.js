const commonConfig = require('./webpack.common')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'production'
})
