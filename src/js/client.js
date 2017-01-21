import React from "react";
import ReactDOM from "react-dom";

// import { getNonce, setIdToken } from './services/authentication-store';

import Layout from "./Layout";
import Routes from "./Routes";


const app = document.getElementById('app');
ReactDOM.render(<Routes />, app);
