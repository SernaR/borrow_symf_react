import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'

import authApi from '../api/auth'
import useAuth from '../hooks/useAuth';
import Form from '../components/forms/Form';
import Field from '../components/forms/Field';
import Button from '../components/forms/Button';
import ErrorMessage from '../components/forms/ErrorMessage'
import routes from '../navigation/routes';

import { Container, makeStyles } from '@material-ui/core';

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
    },
}));

const validationSchema = Yup.object().shape({
    name: Yup.string().required("le pseudo est obligatoire").min(3, "Il faut 3 caractères au minimum").max(30, "Il faut 30 caractères au maximum"),
    email: Yup.string().required("l'adresse email est obligatoire").email("l'adresse email doit avoir un format valide"),
    password: Yup.string().required("le mot de passe est obligatoire").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Votre mot de passe doit avoir au moins 1 majuscule, 1 chiffre, 1 caractère spécial et une longueur d'au moins 8 caractères"),
    passwordConfirm: Yup.string().required("le mot de passe est obligatoire") .oneOf([Yup.ref('password'), null], "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original")
})

const Register = ({history}) => {
    const classes = useStyles();
    const auth = useAuth()

    const [errorMessage, setErrorMessage] = useState()

    const handleSubmit = async user => {
        //event.preventDefault(); //////////////////////********************// */

        const result = await authApi.register(user)
        if (!result.ok) return setErrorMessage("Des errreurs dans le formulaire")

        const loginResult = await authApi.login({username: user.email, password: user.password})
        if(loginResult.ok) {
            auth.login(loginResult.data.token)
            history.replace(routes.PRODUCTS)
        }
    }

    return ( 
        <Container component="main" maxWidth="xs">
            <div className={classes.from_container}>
                <ErrorMessage errorMessage={errorMessage} />
                <Form
                    initialValues={{ 
                        name: '', 
                        email: '', 
                        password: '',
                        passwordConfirm: ''
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >
                        <Field 
                            label='Pseudo'
                            name="name" 
                            autoFocus/>
                        <Field 
                            label='Adresse Email'
                            name="email"/>
                        <Field 
                            label='Mot de passe'
                            name="password"
                            type="password"/>
                        <Field 
                            label='Confirmation du mot de passe'
                            name="passwordConfirm"
                            type="password"/>
                        <Button title={"S'inscrire"}/>  
                        <Link to={routes.LOGIN}>J'ai déjà un compte</Link>
                </Form>     
            </div> 
        </Container>    
    );
}

export default Register;