const { buildSchema } = require('graphql');

const CountryService = require('../services/country');
const ExchangeRateService = require('../services/exchange.rate');

export const schema = buildSchema(`
  type Query {
    country(name: String): Country
  }
  type Country {
    fullName
    population
    currencies
  }
`);

export const root = {
  color: (args) => {

    console.log(args)

    return {
      id: 12,
      name: 'blue',
    };
  },
};
