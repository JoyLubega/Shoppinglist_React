import React, { Component } from 'react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Modal,Button} from 'react-materialize';



const baseURL = "http://127.0.0.1:5000"

class GetItems extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loggedIn: localStorage.getItem('token'),
          shoppingLists:[],
          Items:[],
        item:"",
        loadedItems: false,
      };
  }

  componentDidMount() {
        this._mounted = true;
        this.getItems();
  }

  componentWillUnmount() {
        this._mounted = false;


  }
  onInputChanged = (event) => {
     this.setState({
    [event.target.name]: event.target.value
      });
    };

  getItems = (event,id) => {
          axios.get(`${baseURL}/shoppinglists/${this.props.match.params.id}/items`,
                {headers: {"Authorization": localStorage.getItem("token")}})
                .then((response)=>{
                  this.setState({
                    Items: response.data,
                    loadedItems: true,
                  });

                })
                .catch((error) => {


                });

};


editItems = (event,id) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(`${baseURL}/shoppinglists/${this.props.id}/items/${id}`,{

            item: this.state.name
        })

            .then(() => {
               window.location.reload();
            })
            .catch((error) => {

                NotificationManager.error(error.response.data.Error);
            });

        };


        deleteItems = (event,id) => {
          event.preventDefault();
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
          axios.delete(`${baseURL}/items/${id}`)
              .then(() => {
                window.location.reload();

              })
              .catch((error) => {

                  NotificationManager.error(error.response.data.Error);
              });

          };




  render() {
    const {Items, loadedItems} = this.state;

    return (
      <div >
      <div className="getitems_container">
            <div className="dashboard_navbar navbar-fixed" >
              <nav >
                <div className="nav-wrapper">
                <a href="/dashboard"><i className="material-icons left">home</i></a>
                  <p className="brand-logo">Charis ShoppingList</p>
                  <ul className="right hide-on-med-and-down">
                  <li>
                  <a href="/search"><i className="material-icons right">search</i></a>
                  </li>
                      <li>
                        <input name="search" onChange={this.onInputChanged} type="text" placeholder="Search" />
                      </li>

                    <li><a href="/logout"><i className="material-icons right">assignment_returned</i></a></li>
                    <li>
                    <p>Log</p>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

      {
        loadedItems
        ?
        Items.map((item,id) =>(
            <div key={id} className="items" >

              <p>
              Item Name:{item.name}
              <Modal
                      header='Edit Item'
                      trigger={<button className="btn-floating btn-small waves-effect waves-light blue"><i className="material-icons blue">edit</i></button>}>

                      <div className="row">
                      <form className="col s12" onSubmit={(event)=>this.editItems(event,item.id)} >
                      <div className="row">
                      <div className="input-field col s12">
                      <input name="name" value={this.state.name} onChange={this.onInputChanged} type="text" className="validate"/>
                      <label for="name">New item name:</label>
                      </div>
                      </div>
                      <Button className="red" waves='light'>Save</Button>
                      </form>
                      </div>
              </Modal>
              <button className="btn-floating btn-small waves-effect waves-light red" onClick={(event)=>this.deleteItems(event,item.id)}><i className="material-icons">delete</i></button>
        </p>
              </div>
              ))
        :"Loading ...."
      }
<a class=" btn-floating btn-large waves-effect waves-light green" href="/dashboard" role="button"><i className="material-icons">fast_rewind</i></a>
</div>
      </div>
    );
  }
}

export default GetItems;
