import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import store from './store/store';

import Layout from "./Layout";
import Routes from "./Routes";


const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}>
    <Routes />
</Provider>, app);
