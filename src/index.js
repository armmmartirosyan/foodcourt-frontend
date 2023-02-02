import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/style.scss';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import reducer from './store/reducers/index';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';

export const store = configureStore({
    reducer: reducer,
    devTools: true,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

reportWebVitals();
