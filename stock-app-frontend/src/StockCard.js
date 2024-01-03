import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StockCard = ({ stock }) => {
    const [chartData, setChartData] = useState([{ name: 'Open', value: stock.openPrice }]);

    useEffect(() => {
        setChartData(chartData => [...chartData, { name: 'Current', value: stock.currentPrice }]);
    }, [stock.currentPrice]);

    const cardStyle = {
        backgroundColor: '#fff',
        color: '#424242',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        margin: '10px',
        padding: '15px',
        borderRadius: '8px',
    };
    const priceChange = stock.currentPrice - stock.openPrice;
    const priceStyle = { color: priceChange >= 0 ? 'green' : 'red', };

    return (
        <Card style={cardStyle}>
            <CardContent>
                <Typography variant="h5" style={{ color: '#1a73e8' }}>{stock.symbol}</Typography>
                <Typography variant="body2" style={priceStyle}>
                    ${stock.currentPrice.toFixed(2)}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" hide />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default StockCard;
