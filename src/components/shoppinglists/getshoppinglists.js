import React, { Component } from 'react';
import { Navbar,NavItem,Modal,Button, Toast ,Row, Input,Icon} from 'react-materialize'
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import GetItems from '../items/getitems.js';


const baseURL = "http://127.0.0.1:5000"



class GetShoppinglist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loggedIn: localStorage.getItem('token'),
          shoppingLists:[],
          Items:[],
          name: '',
          email: '',
          password: '',
          item:"",
          success: false,
            totalItems: '',
            itemsPerPage: '',
            activePage: '',
            nextPage: '',
            previousPage: '',
            view_item: false,

            found: true,
            message:"",
            errmessage: "",
            limit:""
      };
  }


  componentDidMount() {
        this._mounted = true;
        this.getShoppingLists()
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    onInputChanged = (event) => {
       this.setState({
      [event.target.name]: event.target.value
        });
      };

      getshoppingLists = (q)=>{

        axios.get(`${baseURL}/shoppinglists` + q
            ,{headers: {"Authorization": localStorage.getItem("token")}})
              .then((response)=>{
                this.setState({
                  shoppingLists: response.data.shoppinglists
                });

              })
              .catch((error) => {

                  NotificationManager.error(error.response.data.Error);
              });



        };

      getShoppingLists = (event)=>{
        axios.get(`${baseURL}/shoppinglists`
            ,{headers: {"Authorization": localStorage.getItem("token")}})
            .then((response)=>
                  {this.setState({shoppingLists: response.data.shoppinglists})

                })


        };


          onHandleEditShoppinglist = (event,id) => {
                  event.preventDefault();
                  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                  axios.put(`${baseURL}/shoppinglists/${id}`,{

                      name: this.state.name,
                      desc: this.state.desc
                  })
                      .then(() => {
                         window.location.reload();
                      })
                      .catch((error) => {

                          NotificationManager.error(error.response.data.Error);
                      });

                  };


      onHandleDeleteShoppinglist = (event,id) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.delete(`${baseURL}/shoppinglists/${id}`)
            .then(() => {window.location.reload();})
            .catch((error) => {

                NotificationManager.error(error.response.data.Error);
            });

        };

        onHandleAddItem = (event, id) => {
              event.preventDefault();
              axios.post(`${baseURL}/shoppinglists/${id}/items`,
                  {

                      item: this.state.name
                  },{headers: {"Authorization": localStorage.getItem("token")}})
                  .then(() => {
                     window.location.reload();
                  })
                  .catch((error) => {

                      NotificationManager.error(error.response.data.Error);
                  });

            };

            onSearchInput = (e) => {
                e.preventDefault();
                if (this.state.found === true){
                    this.setState({ q: e.target.value }, () => {
                        let q = "?q=" + this.state.q;
                        this.getshoppingLists(q);
                    })
                }
                else {
                    this.setState({ q: e.target.value }, () => {
                        let q = "?q=" + this.state.q;
                        this.getshoppingLists(q);
                    })
                    this.setState({
                        found: true
                    })
                }

            }




    render() {
      let search = <div className="input-group pull-right col-md-4">
               <input type="email" onInput={this.onSearchInput} name="search" className="form-control" placeholder="search shopping list" />
               <span className="btn-floating btn-small waves-effect waves-light grey"><i className="material-icons prefix" >search</i></span>
               </div>;
      return (
                <div>
                {search}
                <Toast value="name"><NotificationContainer/></Toast>
                {this.state.shoppingLists.map((list,id) => {

                return <div id="liss" key={id}>
                <div className="row">
                        <div className="col">
                              <div className="card white thecard">
                                      <div className="card-content black-text">
                                        <span className="card-title"><h3>Shoppinglist</h3></span>
                                        <p>Shoppinglist Name:{list.name}</p>
                                        <p>Description:{list.desc}</p>
                                        <hr />
                                        <p><h5>Items</h5></p>
                                        <GetItems id={list.id}/>

                                      </div>
                                      <div className="card-action">

                                      <Button className=" red" onClick={(event)=>this.onHandleDeleteShoppinglist(event,list.id)}><i className="material-icons">delete</i></Button>
                                              <Modal
                                                    header='Edit Shoppinglist'
                                                    trigger={<Button className="btn waves-light blue" ><i className="material-icons">edit</i></Button>}>

                                                      <div className="row">
                                                              <form className="col s12" onSubmit={(event)=>this.onHandleEditShoppinglist(event,list.id)} >
                                                                <div className="row">
                                                                  <div className="input-field col s12">
                                                                    <input name="name" id="name" value={this.state.name} onChange={this.onInputChanged} type="text" className="validate"/>
                                                                    <input name="desc" id="desc" value={this.state.desc} onChange={this.onInputChanged} type="text" className="validate"/>
                                                                    <label for="name">New shopping list name:</label>
                                                                  </div>
                                                                </div>
                                                                <Button className="red" waves='light'>Save</Button>
                                                                </form>
                                                        </div>
                                                    </Modal>

                                                <Modal
                                                    header='Add Item to Shoppinglist'
                                                    trigger={<Button className="btn waves-light green"  onClick={this.toggle}><i className="material-icons">add</i></Button>}>

                                                      <div className="row">
                                                              <form className="col s12" onSubmit={(event)=>this.onHandleAddItem(event,list.id)} >
                                                                <div className="row">
                                                                  <div className="input-field col s12">
                                                                    <input name="name"  value={this.state.name} onChange={this.onInputChanged} type="text" className="validate"/>
                                                                    <label for="first_name">Item Name</label>
                                                                  </div>


                                                                </div>
                                                                <Button className="red" waves='light'>Save</Button>
                                                                </form>
                                                        </div>

                                              </Modal>
                                      </div>
                              </div>
                        </div>
                  </div>
            </div>
          })}

        </div>
  );

}
}


export default GetShoppinglist;
