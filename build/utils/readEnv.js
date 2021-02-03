const fs = require('fs')
const { pathResolve } = require('./index')

// read env
// module.exports = (files) => {
//   const fn = (file) => {
//     const fileName = pathResolve(file)
//     const obj = {}
//     if (fs.statSync(fileName).isFile()) {
//       try {
//         const data = fs.readFileSync(fileName, { encoding: 'utf8' })
//         const envStr = data.replace(/\r/g, ';').replace(/\n/g, '')
//         const envArr = envStr.split(';').map((item) => item.split('='))
//         envArr.forEach((item) => {
//           obj[item[0]] = item[1]
//         })
//       } catch (error) {
//         console.error(error)
//       }
//     }
//     return obj
//   }
//   let res = {}
//   let _files = []
//   if (!Array.isArray(files)) {
//     _files = [files]
//   } else {
//     _files = files
//   }
//   _files.forEach((file) => (res = Object.assign(res, fn(file))))
//   console.log(res)
//   return res
// }

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
