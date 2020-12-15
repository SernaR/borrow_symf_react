import React, { useEffect } from 'react';

import useApi from '../hooks/useApi';
import productApi from '../api/products'
import Error404 from '../components/error/Error404';
import ProductCard from '../components/ui/ProductCard';

import { Box, Container, Grid, GridList, GridListTile, makeStyles, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        //border: '1px solid black'
    },
    messages_container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
  }));

const Product = ({match}) => {
    const classes = useStyles();

    const { id } = match.params;
    const { data: product, error, loading, request: loadProduct } = useApi(() => productApi.find(id))
    console.log('loading:', loading)
    console.log('product:', product)
    const isReady = Object.keys(product).length !== 0 && !loading
    
    useEffect(() => {
        loadProduct()
    },[]) 
    
    
    if(error) return <Error404 />

    return ( 
       
        <Container>
            <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12} md={6}>
                        {isReady && <ProductCard product={product}/>}
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.messages_container}>
                        <Box >plop</Box>
                        <TextField fullWidth variant="outlined" label="envoyer un message" />
                    </Grid>
            </Grid>
        </Container>         
    );
}

export default Product;