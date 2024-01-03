// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockCard from './StockCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


const App = () => {

  const [n, setN] = useState(1);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/stocks?n=${n}`);
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };


    const pollStockPrices = () => {
      fetchStocks();
      const intervalId = setInterval(fetchStocks, 1000);


      return () => {
        clearInterval(intervalId);
      };
    };

    if (n > 0 && n <= 20) {
      pollStockPrices();
    }
  }, [n]);

  return (
    <Container>

      <div><h2>Stock Tracker</h2>
        <label>
          Enter the number of stocks (not more than 20):
          <input
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '2px solid #ccc',
              borderRadius: '5px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            min={1}
            max={20}
          />
        </label></div>
      <h1>Stock Prices</h1>

      <Grid container spacing={3}>
        {stocks.slice(0, n).map(stock => (
          <Grid item xs={12} key={stock.symbol}>
            <StockCard stock={stock} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default App;




