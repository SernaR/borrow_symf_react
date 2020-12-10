import React from 'react';
import { HashRouter, Route, Switch, withRouter} from 'react-router-dom';

import Navbar from './Navbar'
import routes from './routes'
import Home from '../pages/Home'
import Products from '../pages/Products'

const Router = () => {
    const NavbarWithRouter = withRouter(Navbar);

    return ( 
        <HashRouter>
            <NavbarWithRouter/>
            <Switch>  
                <Route exact strict path={routes.HOME} component={Home}/>
                <Route path={routes.PRODUCTS} component={Products}/>
            </Switch>  
        </HashRouter>
    );
}

export default Router;