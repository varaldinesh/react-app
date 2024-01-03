const axios = require('axios');
const stockSymbols = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'FB', 'TSLA', 'BRK.A', 'V', 'JNJ', 'WMT', 'PG', 'UNH', 'MA', 'INTC', 'VZ', 'HD', 'DIS', 'PFE', 'BAC', 'KO'];
let stocks = [];

const API_RATE_LIMIT_PER_MINUTE = 5;
const REQUEST_INTERVAL = 60000 / API_RATE_LIMIT_PER_MINUTE;
let requestQueue = [];

const processQueue = () => {
    if (requestQueue.length > 0) {
        const { symbol, resolve, reject } = requestQueue.shift();
        axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true`, {
            headers: { 'Authorization': `Bearer ${process.env.POLYGON_API_KEY}` }
        }).then(response => {
            const stockData = response.data.results[0];
            const stock = {
                symbol: symbol,
                openPrice: stockData.o,
                currentPrice: stockData.o,
                refreshInterval: Math.floor(Math.random() * 5) + 1
            };
            stocks.push(stock);
            setInterval(() => updateStockPrice(stock), stock.refreshInterval * 1000);
            resolve();
        }).catch(error => {
            console.error(`Error fetching data for ${symbol}:`, error);
            reject(error);
        });
    }
};


setInterval(processQueue, REQUEST_INTERVAL);

const fetchStockData = async () => {
    for (const symbol of stockSymbols) {
        await new Promise((resolve, reject) => {
            requestQueue.push({ symbol, resolve, reject });
        });
    }
};

const updateStockPrice = (stock) => {
    const change = stock.currentPrice * 0.01 * (Math.random() - 0.5);
    stock.currentPrice += change;
};

const getStocks = () => {
    return stocks;
};

module.exports = {
    fetchStockData,
    getStocks,
};






