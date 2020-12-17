import React, { useContext, useEffect } from 'react';

import authContext from '../auth/context'
import useApi from '../hooks/useApi';
import productApi from '../api/product'
import conversationApi from '../api/conversation'
import Error404 from '../components/error/Error404';
import ProductCard from '../components/ui/ProductCard';

import { Box, Button, Container, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

//faire method check conversation dans un bouton
//si l'utilisateur a une conversation -> l'afficher
// sinon nouvelle conversation

//redefinir isReady

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
    },
    contact: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
  }));

const Product = ({match}) => {
    const classes = useStyles();
    //const { user } = useContext(authContext)

    const { id } = match.params;
    const { data: product, error, loading, request: loadProduct } = useApi(() => productApi.find(id))
    const { data: conversation, request: loadConversation } = useApi(() => conversationApi.findByBorrower(id))
   
    //a redefinir
    const isReady = Object.keys(product).length !== 0 && !loading
    
    useEffect(() => {
        loadProduct()
        loadConversation()
    },[]) 

    const handleClick= () => {
        //console.log(conversation)
        console.log(conversation)    }

    if(error) return <Error404 />

    return ( 
       
        <Container>
            <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12} md={6}>
                        {isReady && <ProductCard product={product}/>}
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Paper className={classes.contact}>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon />}
                                onClick={handleClick}
                            >
                                Send
                            </Button>
                        </Paper>
                    </Grid>
            </Grid>
        </Container>         
    );
}

export default Product;