const cheerio = require('cheerio')
const got = require('got')

module.exports = (url) => got(url).then(parseElements(url))

const parseElements = (url) => (res) => {
  const $ = cheerio.load(res.body)
  const content = $('#mw-content-text')

  return cheerio(content).html().split('<h2')
  // Remove everything before the first h2
  .slice(1)
  .filter(section => section.match(/mw-headline/))
  // Recover full header tag
  .map(section => '<h2' + section)
  .map(buildItemFromSection(url))
}

const buildItemFromSection = (url) => (section) => {
  const title = cheerio.load(section).text().split('[edit]')[0]
  const id = section.split('id="')[1].split('"')[0]
  return {
    title: title,
    url: url + '#' + id,
    guid: id,
    description: section
  }
}
