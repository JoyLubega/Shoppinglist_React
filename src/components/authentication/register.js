import React, { Component } from 'react';
//styles
import 'bootstrap/dist/css/bootstrap.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { Button, Toast ,Row, Input,Icon} from 'react-materialize';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../../App.css';
const baseURL = "http://127.0.0.1:5000"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('token'),
            name: '',
            email: '',
            password: '',
        };
    }
    /*
        * Fired when input changes
        * @param (event) event when input changes
        * */
        onInputChanged = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        };

        onRegisterClick = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/auth/register`,
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

              <div className=" Register_container container-fluid ">

                  <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box">


                      <div className="charis navbar">Charis</div>
                      <div className="slist">Shopping List</div>

                          <div className="register-div row">
                              <div className=" log_title">
                               Register
                              </div>
                                <form className=" login_form col s12" onSubmit={this.onRegisterClick}>
                                        <div className="row">
                                              <div className="input-field col s12">
                                                <i className="material-icons prefix">account_circle</i>
                                                <input name="name" id="icon_name" onChange={this.onInputChanged} type="text" className="validate"/>
                                                <label for="icon_account_circle">Name</label>
                                              </div>
                                          </div>
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
                                                  <input name="password" onChange={this.onInputChanged} id="icon_create" type="password" className="validate"/>
                                                  <label for="icon_prefix">Password</label>
                                                </div>
                                            </div>

                                            <button className="send  btn waves-effect waves-light" type="submit" name="action">Submit
                                              <i className="material-icons right">send</i>
                                            </button>
                                            <div className="link_register row">
                                            <a class=" reg btn btn-outline-info" href="/login">Login</a>
                                            </div>
                                </form>
                          </div>
                  </div>

                <Toast className="grey"><NotificationContainer/></Toast>


              </div>
        );
    }
}



export default Register;
