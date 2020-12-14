import React from 'react';
import Hero from '../components/ui/Hero';
import ProductCard from '../components/ui/ProductCard';

import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
    card_container: {
        //flexGrow: 1,
        padding: theme.spacing(3),
    }
}))

const Home = () => {
    const classes = useStyles()
    return ( 
        <>
            <Hero />
            <Container>
                <Grid container spacing={3} className={classes.card_container}>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                    <Grid item xs={3}><ProductCard /></Grid>
                </Grid>
            </Container>
            
        </>
    );
}

export default Home;