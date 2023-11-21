import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Brokers from "./components/brokers/brokers.jsx";
import StartPage from "./components/start-page/start-page.jsx";
import StocksList from "./components/stocks-list/stocks-list.jsx";
import StocksExchange from "./components/stocks-exchange/stocks-exhange.jsx";

function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route exact path="/" element={<StartPage />} />
                  <Route path="/brokers" element={<Brokers />} />
                  <Route path="/stocks" element={<StocksList />} />
                  <Route path="/settings" element={<StocksExchange />} />
              </Routes>
          </Router>
      </>
  )
}

export default App
