import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StockCard = ({ stock }) => {

    const cardStyle = {
        backgroundColor: '#fff', // white background
        color: '#424242', // dark gray text
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // subtle shadow
        margin: '10px',
        padding: '15px',
        borderRadius: '8px', // slightly rounded corners
    };

    const priceChange = stock.currentPrice - stock.openPrice;
    const priceStyle = {
        color: priceChange >= 0 ? 'green' : 'red',
    };

    return (
        <Card style={cardStyle}>
            <CardContent>
                <Typography variant="h5" style={{ color: '#1a73e8' }}>{stock.symbol}</Typography>
                <Typography variant="body2" style={priceStyle}>
                    ${stock.currentPrice.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StockCard;
