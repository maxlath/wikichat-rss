const getElements = require('./get_elements')
const serializeElements = require('./serialize_elements')
const cache = require('./cache')
const { enabled: cachingEnabled } = require('config').caching

module.exports = (data) => {
  const { site_url: url } = data

  if (cachingEnabled) {
    return getCachedVersion(url, data)
  } else {
    return getElements(url)
    .then(serializeElements(data))
  }
}

const getCachedVersion = (url, data) => {
  return cache.get(url)
  .catch((err) => {
    if (err.message === 'cache_miss') {
      return getElements(url)
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
