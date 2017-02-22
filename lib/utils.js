const { green } = require('chalk')

module.exports = {
  log: (label, obj) => {
    const args = [ green(label) ]
    if (obj) args.push(obj)
    console.log.apply(null, args)
  }
}
