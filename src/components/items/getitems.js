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
          offset: 0,
          currentPage: 1,
          listsPerPage:4,
          limit:'',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }
  // handles oninput change in a form
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


      // click event for pagnation
                        handleClick(event) {
                          this.setState({
                            currentPage: Number(event.target.id)
                          });

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


          handleclick(offset) {
              this.setState({offset});
            }

  render() {
    const {Items, loadedItems,currentPage, listsPerPage} = this.state;




    // Logic for displaying items
    const indexOfLastlist = currentPage * listsPerPage;
    const indexOfFirstlist = indexOfLastlist -listsPerPage;
    const currentitems = Items.slice(indexOfFirstlist, indexOfLastlist);




    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Items.length / listsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (


        <Button className=" btn-floating btn-small waves-effect waves-light blue "
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </Button>

      );
    });

    return (
      <div >
      <div className="dashboard_navbar navbar-fixed" >
        <nav className="black" >
          <div className="nav-wrapper">
          <a href="/dashboard"><i className="material-icons left">home</i></a>
            <p className="brand-logo">Charis ShoppingList</p>
            <ul className="right hide-on-med-and-down">
              <li><a href="/logout"><i className="material-icons right">assignment_returned</i></a></li>
              <li>
              <p>Log</p>
              </li>
            </ul>
          </div>
        </nav>
    </div>
      <div className="getitems_container  ">


        <div className="container">
        <div className="row">

      {
        loadedItems
        ?
        currentitems.map((item,id) =>(
            <div key={id} className="col-sm-6 col-md-4" >
                  <div className="">
                  <div className="card">
                  <div className="card-block">
                    <span className="card-title"><h3>{item.name}</h3></span>
                    </div>
                      <div className="card-footer">
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

</div>
</div>

              </div>
              </div>

              ))
        :"Loading ...."
      }
      <br/>
</div></div>
</div>


<div className="footer  ">
  <nav aria-label="" className="fixed-bottom black">
    <ul className="pager text-center">

     Page:{renderPageNumbers}
<a className=" btn btn-large waves-effect waves-light green" href="/dashboard" role="button">BACK <i className="material-icons">fast_rewind</i></a>
    </ul>
  </nav>

</div>
      </div>
    );
  }
}

export default GetItems;
