const commonConfig = require('./webpack.common')
const webpackMerge = require('webpack-merge')
const readEnv = require('./utils/readEnv')
const webpack = require('webpack')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(styl|stylus|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.DefinePlugin(readEnv('.env.prod'))
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()]
  }
})
