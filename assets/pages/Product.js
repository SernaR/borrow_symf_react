import React, { useEffect } from 'react';

import useApi from '../hooks/useApi';
import googleApi from '../api/google'
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
    container: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
    },
    cockpit: {
        width:' 100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        background: theme.palette.primary.main,
        color: 'white'
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

const Product = ({match}) => {
    const classes = useStyles();
   
    //const { id } = match.params;
    const isbn = 9782330051006
    let book = {}
    const { data , error, loading, request: loadBook } = useApi(() => googleApi.findByIsbn(isbn))
    
    //a redefinir
    const isReady = Object.keys(data).length !== 0 && !loading /**************************************** */
    if(isReady) {
        book = data.items[0].volumeInfo
    }
    useEffect(() => {
        loadBook()
    },[]) 

    console.log(data)
    if(error) return <Error404 />

    return ( 
       <>
            {isReady && <>
                <Box className={classes.cockpit}>
                    <Text size='title1' className={classes.title}>{book.title}</Text>
                    <Text size='title2' >Par {book.authors}</Text>
                </Box>
                <Container>
                    <Paper className={classes.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <img src="images/products/skltr-5fcbbe3a6f3d4420033800.png" className={classes.image}/>
                            </Grid> 
                            <Grid xs={12} md={8} item container direction="column" >
                                <Text size='title2'>Description : </Text>
                                <Text size="body1">{book.description}</Text>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container className={classes.buttons}>
                        <Fab color="primary" size="small" aria-label="add" className={classes.button}>
                            <MailOutlineIcon />
                        </Fab>
                        <Fab color="primary" size="small" aria-label="add" className={classes.button}>
                            <NotificationsNoneIcon />
                        </Fab>
                        <Fab color="primary" size="small" aria-label="add" className={classes.button}>
                            <FavoriteBorderIcon />
                        </Fab>
                    </Grid>
                </Container>    
            </>}     
        </>
    )
}

export default Product;