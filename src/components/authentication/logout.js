import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('token');
  }

  render() {
    return <li><a href="/logout"><i className="material-icons right">assignment_returned</i></a></li>
  }
}

export default Logout;
