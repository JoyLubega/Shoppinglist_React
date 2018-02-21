import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Modal,Button} from 'react-materialize'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import AddShoppinglist from './addshoppinglists.js';

import {baseURL} from '../../config.js';
import Pagination from '../../Pagination.js';

export class GetShoppinglist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          shoppingLists:[],
          Items:[],
          name: '',
          desc: '',
          email: '',
          password: '',
          success: false,
          count: '',
          limit:'5',
          term:'',
          page:'1'


    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
     this.setState({name: event.target.value});
   }

  componentWillMount() {
        this._mounted = true;
        this.getShoppingLists()
    }

    componentWillUnmount() {
        this._mounted = false;
    }

      // Handles input change in forms
    onInputChanged = (event) => {
      this.setState({

          [event.target.name]: event.target.value
      })

      };



      // pagnation
      onPagination = (event,limit,page)=>{
        event.preventDefault();
        axios.get(`${baseURL}/shoppinglists?page=${page}&limit=${limit}`
            ,{headers: {"Authorization": localStorage.getItem("token")}})
              .then((response)=>{
                this.setState({
                  shoppingLists: response.data.shoppinglists,

                });

              })
              .catch((error) => {


                  toast.error(error.response.data.message)

              });
        };


      // gets all shoppinglists after search
      onSearchLists = (term)=>{

        axios.get(`${baseURL}/shoppinglists?q=${term}`
            ,{headers: {"Authorization": localStorage.getItem("token")}})
              .then((response)=>{
                this.setState({
                  shoppingLists: response.data.shoppinglists,

                });

              })
              .catch((error) => {


                  toast.error(error.response.data.message)

              });
        };

        // gets all shoppinglists of the User
        getShoppingLists = ()=>{
        axios.get(`${baseURL}/shoppinglists`
            ,{headers: {"Authorization": localStorage.getItem("token")}})
            .then((response)=>
                  {this.setState({
                    shoppingLists: response.data.shoppinglists,
                    count:response.data.count

                  })

                })
            .catch(error=>{
            })
        };


        //Editing shoppinglist
          onHandleEditShoppinglist = (event,id) => {
                  event.preventDefault();

                  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                  axios.put(`${baseURL}/shoppinglists/${id}`,{

                      name: this.state.name,
                      desc: this.state.desc
                  })
                      .then(() => {

                         document.querySelector(`#modal${id} .modal-close`).click();
                         this.getShoppingLists();
                      })
                      .catch((error) => {

                          toast.error(error.response.data.Error)
                      });

                  };
                  // click event for pagnation
                  handleClick(event) {
                    this.setState({
                      currentPage: Number(event.target.id)
                    });
                }

//Delete shoppinglist


      onHandleDeleteShoppinglist = (event,id) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.delete(`${baseURL}/shoppinglists/${id}`)
            .then(() => {window.location.reload();})
            .catch((error) => {

                toast.error(error.response.data.Error)
            });
        };

//Add item to shoppinglist
        onHandleAddItem = (event, id) => {
              event.preventDefault();
              axios.post(`${baseURL}/shoppinglists/${id}/items`,
                  {
                      item: this.state.name
                  },{headers: {"Authorization": localStorage.getItem("token")}})
                  .then(() => {

                    document.querySelector(`#model${id} .modal-close`).click();
                    this.getShoppingLists();
                  })
                  .catch((error) => {

                      toast.error(error.response.data.Error)
                  });

            };

// move to items
              MovetoItems(event,id){
                this.props.history.push(`/getitems/`+id);
              }

    render() {

//search
                let search = <div className="input-group pull-right col-md-4">
                     <input
                      value={this.state.term}
                      onChange={event=> this.setState({term:event.target.value}, ()=>{
                        this.onSearchLists(this.state.term);

                      })
                    }
                      name="term" className="form-control"
                      placeholder="search shopping list" />
                     <span className="btn-floating btn-small waves-effect waves-light grey"><i className="material-icons prefix" >search</i></span>
                     </div>;


            return (
                <div>
                <AddShoppinglist getlists={this.getShoppingLists}/>

                <div className='container'>
                {search}

                <ToastContainer/>

                  <br/>


                    <div className='row'>
                {
                  this.state.shoppingLists.map((list, id) => {
                    return <div className="col-sm-6 col-md-4"   key={list.id}>
                              <div className="">
                                <div className="card">
                                        <div className="card-block">
                                              <div className="">
                                                <span className="card-title"><h3>{list.name}</h3></span>
                                                <p>Description:{list.desc}</p>
                                              </div>
                                          <div className="card-footer">
                                                  <button className="btn btn-outline-info " data-toggle="tooltip" data-placement="top" title="Delete shoppinglist" onClick={(event)=>this.onHandleDeleteShoppinglist(event,list.id)}><i className="material-icons red">delete</i></button>
                                                  <button className=" btn btn-outline-info " data-toggle="tooltip" data-placement="top" title="View items" onClick={(event)=>this.MovetoItems(event,list.id)} ><i className="material-icons">visibility</i></button>


                                                  <Modal
                                                        id={`modal${list.id}`}
                                                        trigger={<button className="btn btn-outline-info waves-light "g6t data-toggle="tooltip" data-placement="top" title="Edit shoppinglist" ><i className="material-icons">edit</i></button>}>
                                                        Edit shoppinglist<h3>{list.name}</h3>
                                                          <div className="row">
                                                                  <form  id="form" className="col s12" onSubmit={(event)=>this.onHandleEditShoppinglist(event,list.id,list.name)} >
                                                                    <div className="row">
                                                                      <div className="input-field col s12">
                                                                        <input name="name" id={list.id} defaultValue={list.name} onChange={this.onInputChanged} type="text" className="validate"/>
                                                                        <input name="desc" id={list.id} defaultValue={list.desc} onChange={this.onInputChanged} type="text" className="validate"/>
                                                                        <label>New shopping list name:</label>
                                                                      </div>
                                                                    </div>
                                                                    <Button className="red" waves='light'>Save</Button>
                                                                    </form>
                                                            </div>
                                                        </Modal>

                                                        <Modal
                                                        id={`model${list.id}`}
                                                        trigger={<button className="btn btn-outline-info" id="additem" data-toggle="tooltip" data-placement="top" title="Add items" ><i className="material-icons">add</i></button>}>
                                                          Add items to<h3> {list.name}</h3>
                                                          <div className="row">

                                                                  <form className="col s12" onSubmit={(event)=>this.onHandleAddItem(event,list.id)} >
                                                                    <div className="row">
                                                                      <div className="input-field col s12">
                                                                        <input name="name"  value={this.state.name} onChange={this.onInputChanged} type="text" className="validate"/>
                                                                        <label>Item Name</label>
                                                                      </div>


                                                                    </div>
                                                                    <Button className="red" waves='light'>Save</Button>
                                                                    </form>
                                                            </div>

                                                            </Modal>
                                                        </div>
                                                        <br />
                                                        </div>
                                                      <br />

                                                  </div>
                                            </div>
                                      </div>
                  })
                }
                  </div>

                      </div>
                        <div className="footer">
                          <nav aria-label="" className="fixed-bottom black">
                            <ul className="pager text-center">

                            <Pagination
                              count={this.state.count}
                              limit={this.state.limit}
                              onPagination={this.onPagination}
                              />
                            </ul>
                          </nav>

               </div>
        </div>
  );

}



}


export default withRouter(GetShoppinglist);
