import React from 'react';
import { makeStyles } from '@material-ui/core';

const Background = '/images/hero.jpg'
const useStyles = makeStyles(theme =>({
    hero: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '60vh',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        //backgroundAttachment: "fixed",
    }
}))

const Hero = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.hero}></div>
    );
}

export default Hero;