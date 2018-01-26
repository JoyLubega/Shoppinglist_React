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
                    this.props.history.push("/homepage");




                }
            }.bind(this))
            .catch(function () {
                NotificationManager.error(`Email already exists`);
            });
    };
    render() {

            return (

              <div className="container-fluid text-center ">
                  <div className="col-md-4 col-md-offset-4 col-sm-9 auth-box">
                      <div className="ted" id="ted">
                          <div className="loghead" id="loghead">
                              <h4 className="panel-title">REGISTER</h4>

                          </div>
                          <div className="panel-body">
                              <form onSubmit={this.onRegisterClick}>
                                    <Row id="Log_row">
                                        <Input  value="" name="name" onChange={this.onInputChanged} type="text" label="Name" s={12} />
                                        <Input  value="" name="email" onChange={this.onInputChanged} type="email" label="Email" s={12} />
                                        <Input value="" name="password"   onChange={this.onInputChanged}type="Password" label="Password" s={12} />
                                      </Row>
                                <div>
                                <Button  id="Loginbtn" waves='teal'>Register</Button>
                                </div>
                                <br />
                                <div className=" log_in">
                                  <Link to="/login" className="act">Login</Link>
                                </div>

                              </form>
                          </div>
                      </div>
                  </div>
                  <Toast>
                  <NotificationContainer/>
                  </Toast>

              </div>
        );
    }
}



export default Register;
