const { buildSchema } = require("graphql");

const CountryService = require("../services/country");
const ExchangeRateService = require("../services/exchange.rate");

module.exports = {
  schema: buildSchema(`
    type Query {
      country(fullName: String): Country
    }
    type Country {
      fullName: String
      population: String
      currencies: [CurrencyData]
    }
    type CurrencyData {
      code: String
      exchangeToEuro: Float
    }
  `),

  root: {
    country: async ({ fullName }) => {
      const countryData = await CountryService.getCountryInformation(fullName);
      const { name, population, currencies } = countryData[0];
      const symbols = currencies.map(curr => curr.code);
      const currenciesWithExchangeInEUR = await ExchangeRateService.getAllExchangeRatesAgainstEUR(
        symbols
      );
      const curr = symbols.map(symbol => {
        console.log(currenciesWithExchangeInEUR.rates);
        console.log(symbol);
        console.log(currenciesWithExchangeInEUR.rates[symbol]);

        return {
          code: symbol,
          exchangeToEuro: currenciesWithExchangeInEUR.rates[symbol]
        };
      });

      console.log(curr);

      return {
        fullName: name,
        population: population,
        currencies: curr
      };
    }
  }
};
