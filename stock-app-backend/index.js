// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchStockData, getStocks } = require('./stocks');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Start fetching and updating stock data
fetchStockData();

// API endpoint to get updated stocks
app.get('/api/stocks', (req, res) => {
    res.json(getStocks());
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
