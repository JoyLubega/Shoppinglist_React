import React, { Component } from 'react';
// import './App.css';
import { Navbar,NavItem,Modal,Button, Toast ,Row, Input,Icon} from 'react-materialize'
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const baseURL = "http://127.0.0.1:5000"



class AddShoppinglist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loggedIn: localStorage.getItem('token'),
          ShoppingList:[]
      };
  }


  componentDidMount() {
        this._mounted = true;


    }

    componentWillUnmount() {
        this._mounted = false;
    }



    onHandleAddshoppinglist = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/shoppinglists`,
      {

          name: this.state.name,
          desc: this.state.desc
      },{headers: {"Authorization": localStorage.getItem("token")}})
      .then(() => {
         window.location.reload();

      })
      .catch((error) => {

          NotificationManager.error(error.response.data.Error);
      });

};


  onInputChanged = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      });
  };


  render() {
    return (
      <div>
              <div>
              <div className="add_list">
                <p>Add Shopping List</p>

                <Modal
                  header='Add Shopping List'
                  trigger={<button className="btn-floating btn-large waves-effect waves-light red" ><i className="material-icons">add_shopping_cart</i></button>}>

                    <div className="row">
                            <form className="col s12" onSubmit={this.onHandleAddshoppinglist}>
                              <div className="row">
                                    <div className="input-field col s12">
                                      <input name="name" id="first_name" value={this.state.name} onChange={this.onInputChanged} type="text" className="validate"/>
                                      <label for="first_name">Shopping list Name</label>
                                    </div>
                              </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                      <input id="ds" value={this.state.desc} onChange={this.onInputChanged} name="desc" type="text" className="validate"/>
                                      <label for="ds">Description</label>
                                    </div>
                              </div>
                              <Button className="red" waves='light'>Save</Button>
                              </form>
                      </div>

                </Modal>
                </div>
              </div>

      </div>
    );
  }
}

export default AddShoppinglist;