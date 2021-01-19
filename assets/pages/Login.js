import React, { useState } from 'react';
import * as Yup from 'yup'

import useAuth from '../hooks/useAuth';
import authApi from '../api/auth'
import routes from '../navigation/routes'

import Form from '../components/forms/Form';
import Field from '../components/forms/Field';
import Button from '../components/forms/Button'

import { Container, makeStyles } from '@material-ui/core';
import ErrorMessage from '../components/forms/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    from_container: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    }
}))

const validationSchema = Yup.object().shape({
    username: Yup.string().required("l'adresse email est obligatoire").email("l'adresse email doit avoir un format valide"),
    password: Yup.string().required("le mot de passe est obligatoire")
})

const Login = ({history}) => {
    const classes = useStyles();
    const auth = useAuth()

    const [errorMessage, setErrorMessage] = useState()

    const handleSubmit = async(credentials) => {

        const result = await authApi.login(credentials)
        if(!result.ok) return setErrorMessage("Utilisateur inconnu ou alors les informations ne correspondent pas")

        auth.login(result.data.token)
        history.replace(routes.PRODUCTS);
    }

    return ( 
        <Container component="main" maxWidth="xs">
            <div className={classes.from_container}>
                <ErrorMessage errorMessage={errorMessage} />
                <Form
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >  
                        <Field 
                            label='Adresse Email'
                            name="username" 
                            autoFocus
                            />
                        <Field
                            label='Mot de passe'
                            name="password"
                            type="password"
                            />
                        <Button title="Se connecter" />
                </Form>
            </div> 
        </Container>
    );
}

export default Login;