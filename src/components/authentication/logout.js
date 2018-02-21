import React, { Component } from 'react';




class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('token');
  }

  render() {
    return <li><a href="/login"><i className="material-icons right">assignment_returned</i></a></li>
  }
}

export default Logout;
