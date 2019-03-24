const rp = require('request-promise');
const assert = require('assert');

const uri = 'http://localhost:4000/graphql'

describe('GraphQL countries list', () => {
  it ('# should return country information for the UK', (done) => {
    query = `{
      country(fullName: "United Kingdom of Great Britain and Northern Ireland") {
        fullName
        population
        currencies {
          code
          exchangeToEuro
        }
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
    .then(qlRes => {
      assert.deepEqual(qlRes.data.country, {
        fullName: 'United Kingdom of Great Britain and Northern Ireland',
        population: '65110000',
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
      country(fullName: "Zimbabwe") {
        fullName
        population
        currencies {
          code
          exchangeToEuro
        }
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
    .then(qlRes => {
      assert.deepEqual(qlRes.data.country, {
        fullName: 'Zimbabwe',
        population: '14240168',
        currencies: [
          {
            code: 'BWP',
            exchangeToEuro: 12.09084
          },
          {
            code: 'GBP',
            exchangeToEuro: 0.856542
          },
          {
             code: 'CNY',
             exchangeToEuro: 7.605328
          },
          {
             code: 'EUR',
             exchangeToEuro: 1
          },
          {
             code: 'INR',
             exchangeToEuro: 78.30431
          },
          {
             code: 'JPY',
             exchangeToEuro: 124.440389
          },
          {
             code: 'ZAR',
             exchangeToEuro: 16.406206
          },
          {
             code: 'USD',
             exchangeToEuro: 1.132048
          },
          {
            code: '(none)',
            exchangeToEuro: null
          }
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
      country(fullName: Heaven) {
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
