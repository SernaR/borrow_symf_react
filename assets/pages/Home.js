import React from 'react';

import Hero from '../components/ui/Hero';

import { makeStyles } from '@material-ui/core';
import AddProduct from '../components/AddProduct';

const useStyles = makeStyles(theme =>({
    container: {
       
    }
}))

const Home = () => {
    const classes = useStyles()
    
    return ( 
        <>
            <Hero /> 
            <AddProduct />
        </>
    );
}

export default Home;