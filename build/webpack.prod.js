const { pathResolve } = require('./utils')
const commonConfig = require('./webpack.common')
const webpackMerge = require('webpack-merge')
const readEnv = require('./utils/readEnv')
const webpack = require('webpack')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack5-plugin')
// const smwp = new SpeedMeasureWebpackPlugin()

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'production',
  output: {
    path: pathResolve('dist'),
    hashDigestLength: 8,
    filename: 'js/[name].[hash:4].js',
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:4].css'
    }),
    new webpack.DefinePlugin(readEnv('.env.prod')),
    new CompressionPlugin({
      // 小于12kb文件会被压缩
      threshold: 12 * 1024
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: pathResolve('report.html'),
      openAnalyzer: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        // 多进程加速编译
        parallel: true,
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20 * 1024
    }
  }
})
