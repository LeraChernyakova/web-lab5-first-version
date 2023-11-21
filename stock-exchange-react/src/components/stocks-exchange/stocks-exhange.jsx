import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Checkbox, TextField } from '@mui/material';
import axios from 'axios';
import ToolBar from '../tool-bar/tool-bar.jsx';
import './stocks-exchange.css';
import {Socket} from "socket.io-client"

const StocksExchange = () => {
    const [companies, setStocks] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [tradingSpeed, setTradingSpeed] = useState(1);
    const [isTrading, setIsTrading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [stockPrices, setStockPrices] = useState({});
    const [socket, setSocket] = useState<Socket>();
    const fetchStocks = async () => {
        const response = await axios.get(`http://localhost:8080/stocks`);
        setStocks(response.data);
    };

    const handleStartDateChange = (event) => {
        setStartDate(new Date(event.target.value));
    };

    const handleTradingSpeedChange = (event) => {
        setTradingSpeed(parseFloat(event.target.value));
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleCheckboxChange = (company) => {
        const isSelected = selectedCompanies.includes(company);
        setSelectedCompanies(
            isSelected
                ? selectedCompanies.filter((selected) => selected !== company)
                : [...selectedCompanies, company]
        );
    };

    const handleStart = async () => {
        if (selectedCompanies.length > 0) {
            setLoading(true);
        }
        try {
            const response = await axios.post('http://localhost:8080/stockExchange/startTrading', {
                startDate: startDate,
                tickers: selectedCompanies,
                tradingSpeed,
            });
            setCurrentDate(new Date(startDate));
            setIsTrading(true);
            console.log(response.data.message);
            // Start updating stock prices
            startUpdatingPrices();
        } catch (error) {
            console.error('Error starting trading', error);
        }
    };

    const handleStop = async () => {
        setLoading(false);
        try {
            const response = await axios.post('http://localhost:8080/stockExchange/stopTrading');
            setIsTrading(false);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error stopping trading', error);
        }
    };

    const startUpdatingPrices = () => {
        // Start updating prices with the specified frequency
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get('http://localhost:8080/stockExchange/getPrices');
                setStockPrices(response.data);
            } catch (error) {
                console.error('Error updating prices', error);
            }
        }, 1000 * tradingSpeed);

        // Save the intervalId for later use (clearing the interval on stop)
        setUpdateIntervalId(intervalId);
    };


    return (
        <>
            <ToolBar />
            <Container sx={{ width: '100%', marginTop: 3 }}>
                <Typography variant="h2">Stock Exchange Settings</Typography>

                <div>
                    <div>
                        <label>Start Date:</label>
                        <TextField
                            type="date"
                            value={startDate.toISOString().split('T')[0]}
                            onChange={(e) => handleStartDateChange(e)}
                        />
                    </div>
                    <div>
                        <label>Trading Speed (seconds):</label>
                        <TextField
                            type="number"
                            value={tradingSpeed}
                            onChange={(e) => handleTradingSpeedChange(e)}
                        />
                    </div>
                </div>
                <div className="checkbox-container">
                    {companies.map((company) => (
                        <div key={company.id} className="checkbox-item">
                            <Checkbox
                                onChange={() => handleCheckboxChange(company)}
                                checked={selectedCompanies.includes(company)}
                            />
                            <Typography>{company.name}</Typography>
                        </div>
                    ))}
                </div>

                <div className="buttons-container">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStart}
                        disabled={selectedCompanies.length === 0 || loading || isTrading}
                    >
                        Start
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleStop}
                        disabled={!loading || !isTrading}
                    >
                        Stop
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default StocksExchange;