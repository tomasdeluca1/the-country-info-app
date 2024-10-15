const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

router.get("/available-countries", countryController.getAvailableCountries);
router.get("/country-info/:countryCode", countryController.getCountryInfo);

module.exports = router;
