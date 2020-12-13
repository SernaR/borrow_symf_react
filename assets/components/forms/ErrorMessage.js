import React from 'react';
import { Typography } from '@material-ui/core';

const ErrorMessage = ({ errorMessage }) => {
    return <>
        { errorMessage && 
            <Typography 
                gutterBottom 
                color='error'
            >
                {errorMessage}
            </Typography>
        }
    </>
}

export default ErrorMessage;

// {
//     const { violations } = result.data;
//     if(violations) {
//         violations.map( ({ propertyPath, title }) => {
//             apiErrors[propertyPath] = title;
//         });
//         return setErrors(apiErrors);
//     }  
// }