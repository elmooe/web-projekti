/**
 * @fileOverview This file contains code that renders the React app on the client side.
 * @module index
 * @requires React
 * @requires ReactDOM
 * @requires './index.css'
 * @requires './App'
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Renders the React app on the client side.
 * @function
 * @name render
 * @memberof module:index
 * @param {HTMLElement} rootElement - The root element that the React app will be rendered into.
 */
ReactDOM.createRoot(document.getElementById("root")).render(<App />)
