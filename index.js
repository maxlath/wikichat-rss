const app = require('express')()
const { port } = require('config')
const pkg = require('./package.json')
const feeds = require('./feeds')
const getTocElements = require('./lib/get_toc_elements')
const serializeElements = require('./lib/serialize_elements')
const { log } = require('./lib/utils')

app.get('/', function (req, res) {
  log('query', req.query)
  const { feed } = req.query
  const data = feeds[feed]
  if (!data) return res.status(400).send('unknown feed')
  getTocElements(data.site_url)
  .then(serializeElements(data))
  .then(res.send.bind(res))
  .catch(err => res.status(500).send(err.stack))
})

app.listen(port, () => log(`${pkg.name} started on port ${port}!`))
