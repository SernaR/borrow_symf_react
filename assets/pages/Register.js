import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { LOGIN } from '../config/settings';
import authApi from '../api/auth'
import useAuth from '../hooks/useAuth';

import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import routes from '../navigation/routes';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Register = ({history}) => {
    const classes = useStyles();
    const auth = useAuth()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

     const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {...errors};
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            return setErrors(apiErrors)
        }

        let empty = false
        for (const [key, value] of Object.entries(user)) {
            if(value === '') {
                apiErrors[key] = 'Le champs est obligatoire'
                empty = true
            }
        }
        if(empty) return setErrors(apiErrors)

        const result = await authApi.register(user)
        if (!result.ok) {
            const { violations } = result.data;
            if(violations) {
                violations.map( ({ propertyPath, title }) => {
                    apiErrors[propertyPath] = title;
                });
                return setErrors(apiErrors);
            }  
        }

        //auto login
        const loginResult = await authApi.login({username: user.email, password: user.password})
        if(loginResult.ok) {
            auth.login(loginResult.data.token)
            history.replace(routes.PRODUCTS)
        }
    }

    return ( 
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={user.name} 
                        onChange={handleChange}
                        error={errors.name !== ''}
                        helperText={errors.name}
                        fullWidth
                        label="Votre pseudo"
                        name="name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={user.email} 
                        onChange={handleChange}
                        error={errors.email !== ''}
                        helperText={errors.email}
                        fullWidth
                        label="Votre adresse email"
                        name="email"
                        type="email"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={user.password} 
                        onChange={handleChange}
                        error={errors.password !== ''}
                        helperText={errors.password}
                        fullWidth
                        label="Votre mot de passe"
                        name="password"
                        type="password"
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        value={user.passwordConfirm} 
                        onChange={handleChange}
                        error={errors.passwordConfirm !== ''}
                        helperText={errors.passwordConfirm}
                        fullWidth
                        label="Confirmation du mot de passe"
                        name="passwordConfirm"
                        type="password"
                    />  
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        S'inscrire'
                    </Button>
                    <Link to={LOGIN} className="btn btn-link">J'ai déjà un compte</Link>
                </form>
            </div> 
        </Container>    
    );
}

export default Register;