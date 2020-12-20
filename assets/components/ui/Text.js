import React from 'react';
import { Typography } from '@material-ui/core';

const variants= {
    title1: {
        variant: "h3",
        component: "h1"
    },
    title2: {
        variant: "h5",
        component: "h2"
    },
    body1 :{
        variant: "body1",
        component: "p"
    },
}

const Text = ({ size, children, ...otherProps }) => {
    return ( 
        <Typography 
            variant={variants[size].variant} 
            component={variants[size].component} 
            gutterBottom 
            {...otherProps}
                >{children}
        </Typography>
    );
}

export default Text;