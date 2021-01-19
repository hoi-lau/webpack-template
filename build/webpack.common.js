const path = require('path')
const publicPath = path.resolve(__dirname, '../')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function pathResolve(url) {
  return path.resolve(publicPath, url || '')
}

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
          from: path.resolve(publicPath, 'src/static'),
          to: './static'
        }
      ]
    })
  ]
}
