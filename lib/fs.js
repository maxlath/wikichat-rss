const fs = require('fs')

const promisify = (fnName) => (...args) => {
  return new Promise((resolve, reject) => {
    const callback = (err, res) => {
      err ? reject(err) : resolve(res)
    }
    args.push(callback)
    fs[fnName].apply(fs, args)
  })
}

module.exports = {
  stat: promisify('stat'),
  readFile: promisify('readFile'),
  writeFile: promisify('writeFile')
}
