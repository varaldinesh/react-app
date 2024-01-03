// ... other imports ...
import { Line } from 'react-chartjs-2';

const StockCard = ({ stock }) => {
    // ... existing code ...

    const data = {
        labels: stock.priceHistory.map(item => item.date), // Replace with your data
        datasets: [
            {
                label: 'Stock Price',
                data: stock.priceHistory.map(item => item.price), // Replace with your data
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    // ... rest of your component ...
};

export default StockCard;
