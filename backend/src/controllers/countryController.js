const countryService = require('../services/countryService');

async function getAvailableCountries(req, res) {
  try {
    const countries = await countryService.fetchAvailableCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
}

async function getCountryInfo(req, res) {
  const { countryCode, countryName } = req.params;

  try {
    const countryInfo = await countryService.fetchCountryInfo(
      countryCode,
      countryName
    );

    res.json(countryInfo);
  } catch (error) {
    console.error('Error fetching country information:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      error: 'Failed to fetch country information',
      details: error.message,
      stack: error.stack,
    });
  }
}

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
