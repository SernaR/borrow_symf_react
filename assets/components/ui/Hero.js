import React from 'react';

import {images} from '../../config/settings'
import { makeStyles } from '@material-ui/core';

const Background = images.hero
const useStyles = makeStyles(theme =>({
    hero: {
        flexGrow: 1,
        paddingTop: theme.spacing(5),
        height: '60vh',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        backgroundSize: "contain",
    }
}))

const Hero = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.hero}></div>
    );
}

export default Hero;