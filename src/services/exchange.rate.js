const rp = require('request-promise');
const exchangeUri = 'http://data.fixer.io/api/latest';
const accessKey = 'b783c3eeb930694adf3b79b41e85e7c2'

module.exports = {
  getAllExchangeRatesAgainstEUR: (symbols) => {
    return rp(`${exchangeUri}?access_key=${accessKey}&symbols=${symbols.join(',')}`)
  }
}
