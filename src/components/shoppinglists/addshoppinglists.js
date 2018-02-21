import React, { Component } from 'react';
// import './App.css';
import {Modal,Button} from 'react-materialize'
import axios from 'axios';

import {baseURL} from '../../config.js';



class AddShoppinglist extends Component {
  constructor(props) {
      super(props);
      this.state = {

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
         // window.location.reload();
         this.props.getlists();

      })
      .catch((error) => {


        //  NotificationManager.error(error.data.Error);
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
                  trigger={<button className="btn-floating btn-large waves-effect waves-light blue" ><i className="material-icons">add_shopping_cart</i></button>}>

                    <div className="row">
                            <form className="col s12" onSubmit={this.onHandleAddshoppinglist}>
                              <div className="row">
                                    <div className="input-field col s12">
                                      <input name="name" id="name" value={this.state.name} onChange={this.onInputChanged} type="text" className="validate"/>
                                      <label>Shopping list Name</label>
                                    </div>
                              </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                      <input id="desc" value={this.state.desc} onChange={this.onInputChanged} name="desc" type="text" className="validate"/>
                                      <label >Description</label>
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
