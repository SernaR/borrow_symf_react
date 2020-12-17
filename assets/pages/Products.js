import React, { useEffect } from 'react';

import useApi from '../hooks/useApi';
import productApi from '../api/product'
import ProductCard from '../components/ui/ProductCard';

import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
    card_container: {
        padding: theme.spacing(3),
    }
}))

const Products = () => {
    const classes = useStyles()
    const { data: products, error, loading, request: loadProducts } = useApi(productApi.findAll)

    useEffect(() => {
        loadProducts()
    },[]) 
       
    return (  
        <Container>
            <Grid container spacing={3} className={classes.card_container}>
                {products.map(product => 
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard product={product}/>
                    </Grid>
                )} 
            </Grid>
        </Container>      
    )
}

export default Products;