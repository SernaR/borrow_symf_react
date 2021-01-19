import React from 'react';

import Hero from '../components/ui/Hero';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme =>({
    container: {
       
    }
}))

const Home = () => {
    const classes = useStyles()
    
    return <Hero />  
}

export default Home;