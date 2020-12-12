import React, { useState } from 'react';
import ReactDOM from 'react-dom'

import Router from './navigation/Router';
import AuthContext from './auth/context'
import authStorage from './auth/storage'

import { ThemeProvider } from '@material-ui/core';
import { theme } from './config/theme'
import './styles/app.css';

const App = () => {
    const [user, setUser] = useState(authStorage.getUser);
    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{user, setUser}}>
                <Router />
            </AuthContext.Provider>
        </ThemeProvider>
    )   
}


const rootElement = document.querySelector('#root')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
