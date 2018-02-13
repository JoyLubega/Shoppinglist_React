import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Navbar,NavItem,Modal,Button, Toast ,Row, Input,Icon} from 'react-materialize'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

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
          todos: [],
          currentPage: 1,
          listsPerPage:4,
          limit:''
    };
    this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount() {
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
                  shoppingLists: response.data.shoppinglists,
                  success: true,
                    found: true,
                    errmessage: "",
                    activePage: response.data.current,
                    totalItems: response.data.Total,
                    itemsPerPage: response.data.items,
                    nextPage: response.data.next,
                    previousPage: response.data.prev,
                    limit: response.data.per_page
                });

              })
              .catch((error) => {

                  NotificationManager.error(error.response.data.message);
              });
        };

      getShoppingLists = (event)=>{
        axios.get(`${baseURL}/shoppinglists/`
            ,{headers: {"Authorization": localStorage.getItem("token")}})
            .then((response)=>
                  {this.setState({shoppingLists: response.data})

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

                  handleClick(event) {
                    this.setState({
                      currentPage: Number(event.target.id)
                    });
                  }
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

              MovetoItems(event,id){

                this.props.history.push(`/getitems/`+id);
              }

    render() {
                const {shoppingLists, currentPage, listsPerPage } = this.state;

                // Logic for displaying todos
                const indexOfLastlist = currentPage * listsPerPage;
                const indexOfFirstlist = indexOfLastlist -listsPerPage;
                const number = shoppingLists.length
                const currentshoppinglists = shoppingLists.slice(indexOfFirstlist, indexOfLastlist);


                // Logic for displaying page numbers
                const pageNumbers = [];
                for (let i = 1; i <= Math.ceil(shoppingLists.length / listsPerPage); i++) {
                  pageNumbers.push(i);
                }

                const renderPageNumbers = pageNumbers.map(number => {
                  return (
                    <button className="btn-floating btn-small waves-effect waves-light blue "
                      key={number}
                      id={number}
                      onClick={this.handleClick}
                    >
                      {number}
                    </button>
                  );
                });


                let search = <div className="input-group pull-right col-md-4">
                     <input type="email" onInput={this.onSearchInput} name="search" className="form-control" placeholder="search shopping list" />
                     <span className="btn-floating btn-small waves-effect waves-light grey"><i className="material-icons prefix" >search</i></span>
                     </div>;

            return (
                <div>

                {search}

                <Toast value="name"><NotificationContainer/></Toast>

<br/>


                {
                  currentshoppinglists.map((list, id) => {
                    return <div className="liss"  key={id}>
                              <div className="col-sm-6 col-md-4">
                                <div className="thumbnail">
                                        <div className="thecard">
                                              <div className="card-content white-text">
                                                <span className="card-title"><h3>{list.name}</h3></span>
                                                <p>Description:{list.desc}</p>
                                              </div>
                                          <div >
                                                  <button className="btn btn-outline-info red"  onClick={(event)=>this.onHandleDeleteShoppinglist(event,list.id)}><i className="material-icons">delete</i></button>
                                                  <Button className=" btn btn-outline-info " onClick={(event)=>this.MovetoItems(event,list.id)} ><i className="material-icons">visibility</i></Button>

                                                  <Modal
                                                        header='Edit Shoppinglist'
                                                        trigger={<Button className="btn btn-outline-info waves-light " ><i className="material-icons">edit</i></Button>}>

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
                                                        trigger={<Button className="btn btn-outline-info waves-light "  onClick={this.toggle}><i className="material-icons">add</i></Button>}>

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
                                                        <br />
                                                        </div>
                                                      <br />

                                                  </div>
                                            </div>
                                      </div>
                  })
                }
                        <div className="footer  ">
                          <nav aria-label="" className="fixed-bottom black">
                            <ul className="pager text-center">
                              {renderPageNumbers}
                            </ul>
                          </nav>

                    </div>
        </div>
  );

}
}


export default withRouter(GetShoppinglist);
