import React, { useState } from 'react';
import * as Yup from 'yup'

import useAuth from '../hooks/useAuth';
import authApi from '../api/auth'
import routes from '../navigation/routes'

import Form from '../components/forms/Form';
import Field from '../components/forms/Field';
import Button from '../components/forms/Button'

import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
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
    username: Yup.string().required("le nom est obligatoire").email("l'adresse email doit avoir un format valide"),
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
            <div className={classes.container}>
                {errorMessage && <Typography gutterBottom color='error'>{errorMessage}</Typography>}
                <Form
                    initialValues={{ username: 'user3@domain.fr', password: 'Mot2passe!!' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >  
                        <Field 
                            name="username" 
                            label='Adresse Email'
                            />
                        <Field
                            name="password"
                            type="password"
                            label='Mot de passe'
                            />
                        <Button title="Se connecter" />
                </Form>
            </div> 
        </Container>
    );
}

export default Login;