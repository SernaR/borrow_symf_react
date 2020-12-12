import React from 'react';
import { Field, useField } from 'formik'
import { TextField } from '@material-ui/core';

const AppFormField = ({label, type='text', autoFocus=false, ...props}) =>  {
    const [field, meta]  = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''

    return <>
        <Field
            {...field}
            helperText={errorText}
            error={!!errorText}

            as={TextField}
            label={label}
            autoFocus={autoFocus}
            type={type}
            variant="outlined"
            margin="normal"
            fullWidth
        />
    </>
}
 
export default AppFormField;

