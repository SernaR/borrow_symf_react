import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from './routes'
import useAuth from '../hooks/useAuth';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
  menuButton: {
    textDecoration: 'none',
    color: 'inherit',
  },
  toolbar: {
    justifyContent: 'space-around'
  },
})

export default function Navbar({ history }) {
  const classes = useStyles();
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout
    history.push(routes.LOGIN);
  } 
 
  return (  
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
          <NavLink to={routes.HOME} className={classes.menuButton}><Typography variant="h5" color="inherit" >Kip Creativ'</Typography></NavLink>  
          <div>
            {user && <>
              <Button color="inherit"><NavLink to={routes.PRODUCTS} className={classes.menuButton}>Annonces</NavLink></Button>
              <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
            </>||
              <Button color="inherit"><NavLink to={routes.LOGIN} className={classes.menuButton}>Connexion</NavLink></Button>
            }
          </div>
      </Toolbar>
    </AppBar>
  );
}

/* <div>
          { isAuthenticated && <>
            <Button color="inherit"><NavLink to="/rendez-vous/nouveau" className={classes.menuButton}>Nouveau</NavLink></Button>
            <Button color="inherit"><NavLink to="/planning" className={classes.menuButton}>Planning</NavLink></Button>
            <Button color="inherit"><NavLink to="/recherche" className={classes.menuButton}>Recherche</NavLink></Button>
            <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
          </> ||  
            <Button color="inherit"><NavLink to="/connexion" className={classes.menuButton}>Connexion</NavLink></Button>
          }  
        </div>  */