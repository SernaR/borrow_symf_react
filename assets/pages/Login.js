import React, { useState } from 'react';

import useAuth from '../hooks/useAuth';
import authApi from '../api/auth'
import routes from '../navigation/routes'

import { Button, Container, makeStyles, TextField } from '@material-ui/core';

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

const Login = ({history}) => {
    const classes = useStyles();
    const auth = useAuth()

    const [credentials, setCredentials] = useState({
        username: "user3@domain.fr",
        password: "Mot2passe!!"
    })
    const [error, setError] = useState('');

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const result = await authApi.login(credentials)

        if(!result.ok) return setError("Utilisateur inconnu ou alors les informations ne correspondent pas")

        setError('');
        auth.login(result.data.token)
        history.replace(routes.PRODUCTS);
    }

    return ( 
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={credentials.username} 
                        onChange={handleChange}
                        error={ error !== '' }
                        helperText={error}
                        fullWidth
                        label="Login"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={credentials.password}
                        onChange={handleChange}
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Se connecter
                    </Button>
                </form>
            </div> 
        </Container>
    );
}

export default Login;