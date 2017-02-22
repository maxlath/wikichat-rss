const cheerio = require('cheerio')
const got = require('got')

module.exports = (url) => got(url).then(parseElements(url))

const parseElements = (url) => (res) => {
  const $ = cheerio.load(res.body)
  const content = $('#toc')

  return content.find('ul').html()
  .split('\n')
  // Keep only first level entries
  .filter(el => el.startsWith('<li class="toclevel-1'))
  .map(el => {
    const $el = cheerio.load(el)
    const hash = $el.html().split('href="')[1].split('">')[0]
    return {
      title: $el.text().replace(/^\d+\s/, ''),
      url: url + hash,
      guid: hash.slice(1)
    }
  })
}
