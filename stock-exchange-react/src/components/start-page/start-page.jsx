import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './start-page.css';

const StartPage = () => {
    return (
        <div className="img">
            <img src="/background.jpg" alt="Background" className="background-image" />
            <div className="content">
                <Container maxWidth="sm">
                    <Typography variant="h2" sx={{ textShadow: '4px 4px 4px black' }}>
                        Биржа акций
                    </Typography>
                    <Typography variant="h4" sx={{ textShadow: '2px 2px 2px black' }}>
                        Администрирование
                    </Typography>
                    <div className="button-container">
                        <Link to="/brokers" style={{ textDecoration: 'none', marginBottom: '2px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#520100',
                                    color: 'white',
                                    width: '40%',
                                    mb: 2,
                                    mr: 2,
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#520100',
                                    },
                                }}
                            >
                                Список брокеров
                            </Button>
                        </Link>
                        <Link to="/stocks" style={{ textDecoration: 'none', marginBottom: '2px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#520100',
                                    color: 'white',
                                    width: '40%',
                                    mb: 2,
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#520100',
                                    },
                                }}
                            >
                                Список акций
                            </Button>
                        </Link>
                        <Link to="/settings" style={{ textDecoration: 'none', marginBottom: '2px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#520100',
                                    color: 'white',
                                    width: '40%',
                                    mb: 2,
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#520100',
                                    },
                                }}
                            >
                                Настройка биржи
                            </Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default StartPage;