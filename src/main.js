import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/authentication/login.js';
import Register from './components/authentication/register.js';
import Dashboard from './dashboard.js';



const Main = () => (
    <main role="main">
        {/* Handle all the routes that are in the application*/}
        <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />


        </Switch>
    </main>
)

export default Main;
