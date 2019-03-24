const rp = require('request-promise');

const uri = 'http://localhost:4000/graphql'

describe('GraphQL countries list', () => {
  it ('# should return country information for the UK', (done) => {
    query = `{
      country(name: "United Kingdom of Great Britain and Northern Ireland") {
        fullName
        population
        currencies
      }
    }`

    rp({
      uri,
      method: 'POST',
      body: {
        query
      },
      json: true,
    })
    .then(data => {
      assert.deepEqual(data, {
        fullName: 'United Kingdom of Great Britain and Northern Ireland',
        population: 65110000,
        currencies: [
          {
            code: 'GBP',
            exchangeToEuro: 0.856542
          }
        ]
      })
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it ('# should return country information for Zimbabwe, which has multiple currencies', (done) => {
    query = `{
      country(name: Zimbabwe) {
        fullName
        population
        currencies
      }
    }`

    rp({
      uri,
      method: 'POST',
      body: {
        query
      },
      json: true,
    })
    .then(data => {
      assert.deepEqual(data, {
        fullName: 'Zimbabwe',
        population: 65110000,
        currencies: [
          {
            code: 'GBP',
            exchangeToEuro: 0.856542
          },
          {
            code: 'BWP',
            exchangeToEuro: undefined
          },
          {
             code: 'CNY',
             exchangeToEuro: undefined
          },
          {
             code: 'EUR',
             exchangeToEuro: undefined
          },
          {
             code: 'INR',
             exchangeToEuro: undefined
          },
          {
             code: 'JPY',
             exchangeToEuro: undefined
          },
          {
             code: 'ZAR',
             exchangeToEuro: undefined
          },
          {
             code: 'USD',
             exchangeToEuro: undefined
          },
        ]
      })
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it ('# should throw an error for a country that does not exist', (done) => {
    query = `{
      country(name: Heaven) {
        fullName
        population
        currencies
      }
    }`

    rp({
      uri,
      method: 'POST',
      body: {
        query
      },
      json: true,
    })
    .then(data => {
      done(new Error('should have thrown an error'))
    })
    .catch(() => {
      done()
    })
  })
})
