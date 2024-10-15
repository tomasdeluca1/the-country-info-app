const axios = require('axios');

async function fetchAvailableCountries() {
  const response = await axios.get(
    'https://date.nager.at/api/v3/AvailableCountries'
  );
  return response.data;
}

async function fetchCountryInfo(countryCode) {
  try {
    const [borderCountries, populationData, countryInfo] =
      await Promise.allSettled([
        fetchBorderCountries(countryCode),
        fetchPopulationData(countryCode),
        fetchFlagUrl(countryCode),
      ]);

    return {
      borderCountries:
        borderCountries.status === 'fulfilled' ? borderCountries.value : [],
      populationData:
        populationData.status === 'fulfilled' ? populationData.value : [],
      name: countryInfo.status === 'fulfilled' ? countryInfo.value.name : null,
      flag: countryInfo.status === 'fulfilled' ? countryInfo.value.flag : null,
    };
  } catch (error) {
    throw error;
  }
}

async function fetchBorderCountries(countryCode) {
  const response = await axios.get(
    `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
  );
  return response.data.borders;
}

async function fetchPopulationData(countryCode) {
  const countryName = await getCountryName(countryCode);
  const response = await axios.post(
    'https://countriesnow.space/api/v0.1/countries/population',
    {
      country: countryName,
    }
  );

  return response.data.data.populationCounts;
}

async function fetchFlagUrl(countryCode) {
  const countryName = await getCountryName(countryCode);
  const response = await axios.post(
    'https://countriesnow.space/api/v0.1/countries/flag/images',
    {
      country: countryName,
    }
  );
  return response.data.data;
}

async function getCountryName(countryCode) {
  const response = await axios.get(
    `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
  );
  return response.data.commonName;
}

module.exports = {
  fetchAvailableCountries,
  fetchCountryInfo,
};
