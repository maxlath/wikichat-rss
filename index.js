const app = require('express')()
const { port } = require('config')
const pkg = require('./package.json')
const feeds = require('./feeds')
const getFeed = require('./lib/get_feed')
const { log } = require('./lib/utils')

app.use(require('morgan')('dev'))

app.get('/', function (req, res) {
  log('query', req.query)
  const { feed } = req.query
  const data = feeds[feed]
  if (!data) return res.status(400).send('unknown feed')

  getFeed(data)
  .then(res.send.bind(res))
  .catch(err => res.status(500).send(err.stack))
})

app.listen(port, () => log(`${pkg.name} started on port ${port}!`))
