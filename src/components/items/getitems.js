import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Modal,Button} from 'react-materialize';

import {baseURL} from '../../config.js';

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
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
     this.setState({name: event.target.value});
   }

  componentDidMount() {
        try{
          this._mounted = true;
          this.getItems(this.props.match.params.id);
        }
        catch (e){}

  }

  componentWillUnmount() {
        this._mounted = false;


  }
  onInputChanged = (event) => {
     this.setState({
    [event.target.name]: event.target.value
      });
    };

  getItems = (id) => {
          axios.get(`${baseURL}/shoppinglists/${id}/items`,
                {headers: {"Authorization": localStorage.getItem("token")}})
                .then((response)=>{
                  this.setState({
                    Items: response.data,
                    loadedItems: true,
                  });

                })
                .catch((error) => {
                console.log('hello')

                });

};


editItems = (event,id) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(`${baseURL}/shoppinglists/${this.props.match.params.id}/items/${id}`,{

            item: this.state.name
        })

            .then(() => {
               window.location.reload();
            })
            .catch((error) => {

                // NotificationManager.error(error.response.data.Error);
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
      <div>
      <div className="getitems_container">



      {
        loadedItems
        ?
        Items.map((item,id) =>(
            <div key={id} className="items" >

              <p>
              Item Name:{item.name}
              <Modal

                      trigger={<button className="btn-floating btn-small waves-effect waves-light blue"><i className="material-icons blue">edit</i></button>}>
                      Edit item:<h3> {item.name}</h3>
                      <div className="row">
                      <form className="col s12" onSubmit={(event)=>this.editItems(event,item.id)} >
                      <div className="row">
                      <div className="input-field col s12">
                      <input name="name" id="item" defaultValue={item.name} onChange={this.onInputChanged} type="text" className="validate"/>
                      <label>New item name:</label>
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
<a className=" btn-floating btn-large waves-effect waves-light green" href="/dashboard" role="button"><i className="material-icons">fast_rewind</i></a>
</div>


<div className="footer  ">
  <nav aria-label="" className="fixed-bottom black">
    <ul className="pager text-center">

    </ul>
  </nav>

</div>
      </div>
    );
  }
}

export default GetItems;
