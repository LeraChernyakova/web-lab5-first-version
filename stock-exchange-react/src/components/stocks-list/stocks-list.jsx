import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import ToolBar from '../tool-bar/tool-bar.jsx';
import StocksTable from './stocks-table/stocks-table.jsx';
import { Chart } from 'chart.js/auto';
import './stock-list.css'

const StocksList = () => {
    const [companies, setStocks] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const chartRef = useRef(null);

    const fetchStocks = async () => {
        const response = await axios.get(`http://localhost:8080/stocks`);
        setStocks(response.data);
    };

    const getGraphicData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/stocksHistory/AAPL');
            const responseData = response.data;
            setChartData(responseData);
            setShowChart(true);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    useEffect(() => {
        if (chartData.length > 0 && chartRef.current) {
            const parsedData = chartData.map((entry) => ({
                Date: entry.Date,
                Open: parseFloat(entry.Open),
            }));

            const labels = parsedData.map((entry) => entry.Date);
            const values = parsedData.map((entry) => entry.Open);
            console.log(labels);
            console.log(values)

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Open Price',
                            data: values,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <>
            <ToolBar />
            <Container sx={{ width: '100%', marginTop: 3 }}>
                <StocksTable companies={companies} getGraphicData={getGraphicData} />
            </Container>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <CircularProgress />
                </Box>
            ) : showChart ? (
                <Box
                    sx={{
                        mt: 3,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="div" gutterBottom>
                        График акций
                    </Typography>
                    <canvas ref={chartRef} width="1280" height="400" />
                </Box>
            ) : null}

        </>
    );
};

export default StocksList;
