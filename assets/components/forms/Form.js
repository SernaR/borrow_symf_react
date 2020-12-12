import React from 'react';
import { Form, Formik } from 'formik';

const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
    return ( 
        <Formik
            initialValues={initialValues}
            onSubmit={ onSubmit }
            validationSchema={validationSchema}
        >
            { () => (
                <Form >  
                    {children}
                </Form>
            )}
        </Formik>     
    );
}
 
export default AppForm;