import React from 'react';

import {images} from '../../config/settings'
import { makeStyles } from '@material-ui/core';

const Background = images.error404
const useStyles = makeStyles(theme =>({
    container: {
        flexGrow: 1,
        paddingTop: theme.spacing(5),
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        backgroundSize: "contain",
    }
}))

const Error404 = () => {
    const classes= useStyles()
    return ( 
        <div className={classes.container}></div>
    );
}

export default Error404;