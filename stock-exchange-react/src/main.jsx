import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals.jsx';
import { Provider } from 'react-redux';
import store from './store';

const root = document.getElementById('root');

const rootElement = ReactDOM.createRoot(root);

rootElement.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();