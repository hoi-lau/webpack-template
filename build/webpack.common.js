const { pathResolve, publicPath } = require('./utils')
const readEnv = require('./utils/readEnv')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractLoader = require('mini-css-extract-plugin').loader
// error tips
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const notifier = require('node-notifier')

// vue loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// css loader
const CssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: false,
    importLoaders: 2
  }
}
// vue-style-loader
const VueStyleLoader = {
  loader: 'vue-style-loader',
  options: {
    sourceMap: false,
    shadowMode: false
  }
}
// postcss-loader
const PostcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: false
  }
}
const StylusLoader = {
  loader: 'stylus-loader',
  options: {
    sourceMap: false
  }
}
module.exports = {
  context: publicPath,
  entry: {
    app: {
      import: pathResolve('src/index.js')
      // dependOn: 'lodash'
    }
    // lodash: pathResolve('node_modules/lodash')
  },
  target: 'web',
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
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        notifier.notify({
          title: 'webpack compiler error!',
          message: severity + ': ' + errors[0].name,
          subtitle: errors[0].filename || ''
        })
      }
    }),
    new VueLoaderPlugin({
      verbose: true
    })
  ],
  resolve: {
    // '.wasm', '.mjs'
    extensions: ['.js', '.vue', 'css', '.json'],
    alias: {
      vue: pathResolve('node_modules/vue')
    }
  },
  module: {
    // noParse文件中不能含有import require语法
    noParse: /^(vue|vue-router|vuex|vuex-router-sync|lodash)$/,
    rules: [
      // vue
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              preserveWhitespace: false,
              optimizeSSR: false
            }
          }
        ]
      },
      // images
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4 * 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:4].[ext]'
                }
              }
            }
          }
        ]
      },
      // fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4 * 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:4].[ext]'
                }
              }
            }
          }
        ]
      },
      // css
      {
        test: /\.css$/,
        oneOf: [
          // vue-module
          {
            resourceQuery: /module/,
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader
            ]
          },
          {
            resourceQuery: /\?vue/,
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader
            ]
          },
          {
            test: /\.module\.\w+$/,
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader
            ]
          },
          {
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader
            ]
          }
        ]
      },
      // stylus
      {
        test: /\.(styl|stylus)$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader,
              StylusLoader
            ]
          },
          {
            resourceQuery: /\?vue/,
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader,
              StylusLoader
            ]
          },
          {
            test: /\.module\.\w+$/,
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader,
              StylusLoader
            ]
          },
          {
            use: [
              VueStyleLoader,
              MiniCssExtractLoader,
              CssLoader,
              PostcssLoader,
              StylusLoader
            ]
          }
        ]
      },
      // js
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
}
