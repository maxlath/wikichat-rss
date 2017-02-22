const { green } = require('chalk')

var crypto = require('crypto')

module.exports = {
  log: (label, obj) => {
    const args = [ green(label) ]
    if (obj != null) args.push(obj)
    console.log.apply(null, args)
  },
  getHash: (str) => crypto.createHash('md5').update(str).digest('hex')
}
