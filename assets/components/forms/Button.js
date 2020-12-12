import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}))

const AppButton = ({title}) => {
    const classes = useStyles()
    
    return ( 
        <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            className={classes.submit}
            >
            {title}
        </Button>
    );
}

export default AppButton;