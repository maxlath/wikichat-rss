const RSS = require('rss')

module.exports = (data) => (elements) => {
  const feed = new RSS(data)
  elements.forEach(feed.item.bind(feed))
  return feed.xml()
}
