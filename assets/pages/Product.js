import React, { useEffect } from 'react';

import useApi from '../hooks/useApi';
import googleApi from '../api/google'
import Error404 from '../components/error/Error404';


import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



//faire method check conversation dans un bouton
//si l'utilisateur a une conversation -> l'afficher
// sinon nouvelle conversation

//redefinir isReady

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
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
        padding: theme.spacing(1),
    },
    description_label: {
        paddingTop: theme.spacing(2),
    },
    description: {
        paddingRight: theme.spacing(2)
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

    console.log(book)
    if(error) return <Error404 />

    return ( 
       <>
            {isReady && <><Box className={classes.cockpit}>
                <Typography variant="h3" color="inherit" className={classes.title}>{book.title}</Typography>
                <Typography variant="h4">Author: {book.authors}</Typography>
            </Box>
                <Container>
                    <Paper className={classes.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <img src="images/products/skltr-5fcbbe3a6f3d4420033800.png" className={classes.image}/>
                            </Grid> 
                            <Grid xs={12} md={8} item container direction="column" >
                                <Typography variant="h5" className={classes.description_label}>Description : </Typography>
                                <Typography variant="h6" className={classes.description}>{book.description}</Typography>
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
            </Container>    </>}     
        </>
    )
}

export default Product;