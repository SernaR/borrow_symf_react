import React from 'react';
import { HashRouter, Route, Switch, withRouter} from 'react-router-dom';

import Navbar from './Navbar'
import routes from './routes'

import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Product from '../pages/Product';
import Profile from '../pages/Profile';

const Router = () => {
    const NavbarWithRouter = withRouter(Navbar);

    return ( 
        <HashRouter>
            <NavbarWithRouter/>
            <Switch>  
                <Route exact strict path={routes.HOME} component={Home}/>
                <Route path={routes.LOGIN} component={Login}/>
                <Route path={routes.REGISTER} component={Register}/>
                <Route path={routes.PRODUCTS} component={Products}/>
                <Route path={routes.PROFILE} component={Profile}/>
                <Route path={routes.PRODUCT + ':id'} component={Product}/>
            </Switch>  
        </HashRouter>
    );
}

export default Router;