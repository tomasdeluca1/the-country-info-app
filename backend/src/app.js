const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const countryRoutes = require('./routes/countryRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', countryRoutes);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

module.exports = app;
