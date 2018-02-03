import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Navbar,NavItem,Modal,Button, Toast ,Row, Input,Icon} from 'react-materialize'
import 'bootstrap/dist/css/bootstrap.css';


import './App.css';
import  Main from  './main.js';
import Search from './search.js';
import Login from './components/authentication/login.js';
import Logout from './components/authentication/logout.js';
import Register from './components/authentication/register.js';
import AddShoppinglist from './components/shoppinglists/addshoppinglists.js';
import GetShoppinglist from './components/shoppinglists/getshoppinglists.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
handleToggle = () => this.setState({open: !this.state.open});
handleClose = () => this.setState({open: false});



  render() {
    return (
      <div className="dashboard_container">
                      <div className="dashboard_navbar navbar-fixed" >
                        <nav >
                          <div className="nav-wrapper">
                          <a href="/dashboard"><i className="material-icons left">home</i></a>
                            <p className="brand-logo">Charis ShoppingList</p>
                            <ul className="right hide-on-med-and-down">
                            <li>
                            <a href="/search"><i className="material-icons right">search</i></a>
                            </li>
                                <li>
                                  <input name="search" onChange={this.onInputChanged} type="text" placeholder="Search" />
                                </li>

                              <li><a href="/logout"><i className="material-icons right">assignment_returned</i></a></li>
                              <li>
                              <p>Log</p>
                              </li>
                            </ul>
                          </div>
                        </nav>
                    </div>

                            <AddShoppinglist />
                              <div className="show container-fluid">
                              <div className="col">
                              <GetShoppinglist />
                              </div>
                              </div>


                  <div className="dashboard_footer">

                  </div>
    </div>
    );
  }
}

export default Dashboard;
