import React, { useEffect } from 'react';

import useApi from '../hooks/useApi';
import productApi from '../api/product'
import Error404 from '../components/error/Error404';


import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Text from '../components/ui/Text';



//faire method check conversation dans un bouton
//si l'utilisateur a une conversation -> l'afficher
// sinon nouvelle conversation

//redefinir isReady

const useStyles = makeStyles((theme) => ({
    cockpit: {
        width:' 100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        background: theme.palette.primary.main,
        color: 'white'
    },
    card_container: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        }
    },
    description_container: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            marginTop: 0,
        }
    },
    title: {
        paddingTop: theme.spacing(3),
    },
    image: {
        height: 500,
    },
    buttons:{
        marginTop: theme.spacing(1),
        justifyContent: 'flex-end'
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

const Product = ({ match }) => {
    const classes = useStyles();
   
    const { id } = match.params;
    const { data: product, error, loading, request: loadProduct } = useApi(() => productApi.find(id))
    
    useEffect(() => {
        loadProduct()
    },[]) 

    if(error) return <Error404 />

    return ( 
       <> 
           <Box className={classes.cockpit}>
                <Text size='title1' className={classes.title}>{product.name}</Text>
                <Text size='title2' >Par {product.owner && product.owner.name}</Text>
            </Box>
           <Container>
               
                <Box p={2} component={Paper} mt={3} className={classes.card_container}>
                    <Box mr={3}>
                        <img src={product.imageName ? ("/images/products/" + product.imageName) : "/images/404.jpg"} className={classes.image}/>
                    </Box> 
                    <Box className={classes.description_container}>
                        <Text size='title2'>Description : </Text>
                        <Text size="body1">{product.description}</Text>
                    </Box>
                </Box>
                <Box display='flex' className={classes.buttons}>
                    <Fab color="primary" size="small" aria-label="add" className={classes.button}>
                        <MailOutlineIcon />
                    </Fab>
                    <Fab color="primary" size="small" aria-label="add" className={classes.button}>
                        <NotificationsNoneIcon />
                    </Fab>
                    <Fab color="primary" size="small" aria-label="add" className={classes.button}>
                        <FavoriteBorderIcon />
                    </Fab>
                </Box>
            </Container>  
        </>
    )
}

export default Product;