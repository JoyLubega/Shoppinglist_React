import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
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
                        <nav className="black" >
                          <div className="nav-wrapper">
                          <a href="/dashboard"><i className="material-icons left">home</i></a>
                            <p className="brand-logo">Charis ShoppingList</p>
                            <ul className="right hide-on-med-and-down">
                              <li><a href="/logout"><i className="material-icons right">assignment_returned</i></a></li>
                              <li>
                              <p>Log</p>
                              </li>
                            </ul>
                          </div>
                        </nav>
                    </div>
                    <div className="show container-fluid">


                              <div className="col">
                              <GetShoppinglist />
                              </div>
                              </div>



    </div>
    );
  }
}

export default Dashboard;
