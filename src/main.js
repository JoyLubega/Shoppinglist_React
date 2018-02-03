import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/authentication/login.js';
import Logout from './components/authentication/logout.js';
import Register from './components/authentication/register.js';
import Dashboard from './dashboard.js';



const Main = () => (
    <main role="main">
        {/* Handle all the routes that are in the application*/}
        <Switch>
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
    </Switch>
    </main>
)

export default Main;
