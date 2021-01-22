const path = require('path')
const publicPath = path.resolve(__dirname, '../../')

function pathResolve(url) {
  return path.resolve(publicPath, url || '')
}

module.exports = {
  pathResolve,
  publicPath
}
