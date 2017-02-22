const fs = require('./fs')
const { log, getHash } = require('./utils')
const { ttl } = require('config')

module.exports = {
  get: (url) => {
    // Using a hash to avoid filename with URL characters
    const filename = './cache/' + getHash(url)
    return fs.stat(filename)
    .then(stats => {
      const lastModified = new Date(stats.mtime)
      log('lastModified', lastModified)
      const expired = lastModified.getTime() + ttl < Date.now()
      log('expired', expired)
      if (expired) throw new Error('cache_miss')
      return fs.readFile(filename)
    })
    .catch(err => {
      if (err.code === 'ENOENT') err.message = 'cache_miss'
      throw err
    })
  },
  set: (url, xml) => {
    const filename = './cache/' + getHash(url)
    return fs.writeFile(filename, xml)
  }
}
