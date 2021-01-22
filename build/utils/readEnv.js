const fs = require('fs')
const { pathResolve } = require('./index')

// read env
module.exports = (file) => {
  const fileName = pathResolve(file)
  const obj = {}
  if (fs.statSync(fileName).isFile()) {
    try {
      const data = fs.readFileSync(fileName, { encoding: 'utf8' })
      const envStr = data.replace(/\r/g, ';').replace(/\n/g, '')
      const envArr = envStr.split(';').map((item) => item.split('='))
      envArr.forEach((item) => {
        obj[item[0]] = item[1]
      })
    } catch (error) {
      console.error(error)
    }
  }
  return obj
}
