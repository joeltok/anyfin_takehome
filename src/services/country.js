const rp = require("request-promise");
const countriesUri = "https://restcountries.eu/rest/v2";

module.exports = {
  getCountryInformation: fullName => {
    return rp(`${countriesUri}/name/${fullName}?fullText=true`).then(data => {
      return JSON.parse(data);
    });
  }
};
