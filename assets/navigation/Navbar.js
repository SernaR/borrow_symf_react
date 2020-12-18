import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from './routes'
import useAuth from '../hooks/useAuth';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@material-ui/core';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles(theme =>({
  menuButton: {
    textDecoration: 'none',
    color: 'inherit',
  },
  toolbar: {
    justifyContent: 'space-around'
  },
  library: {
    marginRight: theme.spacing(3)
  }
}))

export default function Navbar({ history }) {
  const classes = useStyles();
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    history.push(routes.LOGIN);
  } 
 
  return (  
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
          <NavLink to={routes.HOME} className={classes.menuButton}><Typography variant="h5" color="inherit" >Kip Creativ'</Typography></NavLink>  
          <div>
            {user && <>
              <Button color="inherit" variant="outlined" className={classes.library} startIcon={<ImportContactsIcon />}>
                <NavLink to={routes.PRODUCTS} className={classes.menuButton}>Bibliotheque</NavLink>
              </Button>
              <IconButton color="inherit" aria-label="mail" component="span">
                <MailOutlineIcon />
              </IconButton> 
              <IconButton color="inherit" aria-label="notification" component="span">
              <NotificationsNoneIcon />
                </IconButton> 
              <IconButton color="inherit" aria-label="favorite" component="span">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="account" component="span">
                <Avatar alt="avatar" src="/images/avatar.jpg" />
              </IconButton>
              <IconButton color="inherit" aria-label="logout" onClick={handleLogout}>
                <ExitToAppOutlinedIcon />
              </IconButton>
            </>|| <>
              <Button color="inherit"><NavLink to={routes.LOGIN} className={classes.menuButton}>Connexion</NavLink></Button>
              <Button color="inherit"><NavLink to={routes.REGISTER} className={classes.menuButton}>S'inscrire</NavLink></Button>

            </>}
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