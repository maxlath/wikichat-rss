const getTocElements = require('./get_toc_elements')
const serializeElements = require('./serialize_elements')
const cache = require('./cache')

module.exports = (data) => {
  const { site_url: url } = data

  return cache.get(url)
  .catch((err) => {
    if (err.message === 'cache_miss') {
      return getTocElements(url)
      .then(serializeElements(data))
      .then((xml) => {
        cache.set(url, xml)
        return xml
      })
    } else {
      throw err
    }
  })
}

