import React, { Component } from 'react';
//styles
import 'bootstrap/dist/css/bootstrap.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { Button, Toast ,Row, Input,Icon} from 'react-materialize'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../App.css';
import Search from '../../search.js';
const baseURL = "http://127.0.0.1:5000"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            email: '',
            password: '',
        };
    }

        onInputChanged = (event) => {
            this.setState({
              open: false,
              name:'',
                [event.target.name]: event.target.value
            })
        };


        componentDidMount() {

              // this.getShoppingLists();
          }

          componentWillmount() {


          }

        onLoginClick = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/auth/login`,
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            .then(function (response) {
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.token);
                    this.setState({loggedIn: response.data.token});
                    this.props.history.push("/dashboard");
                }

            }.bind(this))
            .catch(function (error) {
                NotificationManager.error(error.response.data.Error);


            });

    };

    render() {
      return (

        <div className=" Login_container container-fluid text-center ">
            <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box">

            <div className="charis navbar">Charis</div>
            <div className="slist">Shopping List</div>
                    <div className="login-div row">
                        <div className=" log_title">
                         Login
                        </div>
                          <form className=" login_form col s12" onSubmit={this.onLoginClick}>
                                    <div className="row">
                                          <div className="input-field col s12">
                                            <i className="material-icons prefix">email</i>
                                            <input name="email" id="icon_email" onChange={this.onInputChanged} type="email" className="validate"/>
                                            <label for="icon_telephone">Email</label>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="input-field col s12">
                                            <i className="material-icons prefix">lock</i>
                                            <input name="password" onChange={this.onInputChanged} id="icon_prefix" type="password" className="validate"/>
                                            <label for="icon_prefix">Password</label>
                                          </div>
                                      </div>

                                      <button className="send  btn waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                      </button>
                                      <div className="link_register row">
                                      <a class=" reg btn btn-outline-info" href="/register">Register</a>
                                      </div>
                          </form>
                    </div>
            </div>

            <Toast><NotificationContainer/></Toast>


        </div>

        );
    }
}

export default Login;
