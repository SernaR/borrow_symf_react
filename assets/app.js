import React from 'react';
import ReactDOM from 'react-dom'
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import './styles/app.css';

// start the Stimulus application
import './bootstrap';


const App = () => {
    return ( 
        <h1>Hello world</h1>
    );
}


const rootElement = document.querySelector('#root')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
