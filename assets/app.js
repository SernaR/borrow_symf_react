import React from 'react';
import ReactDOM from 'react-dom'
import Router from './navigation/Router';

import './styles/app.css';


const App = () => {
   
    return <Router />
}


const rootElement = document.querySelector('#root')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
