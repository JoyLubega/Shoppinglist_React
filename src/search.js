import React, { Component } from 'react'
import axios from 'axios';

const baseURL = "http://127.0.0.1:5000"
class Search extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loggedIn: localStorage.getItem('token'),
          shoppingLists:[]


      };
  }


  componentDidMount() {
        this._mounted = true;
        this.getShoppingLists()
    }
 //
 //    componentWillUnmount() {
 //        this._mounted = false;
 //    }
 // handleInputChange = () => {
 //   this.setState({
 //     query: this.search.value
 //   })
 // }


 // implement search
     onSearchInput = (e) => {
         e.preventDefault();
         if (this.state.found === true){
             this.setState({ q: e.target.value }, () => {
                 let q = "?q=" + this.state.q;
                 this.getShoppingLists(q);
             })
         }
         else {
             this.setState({ q: e.target.value }, () => {
                 let q = "?q=" + this.state.q;
                 this.getShoppingLists(q);
             })
             this.setState({
                 found: true
             })
         }

     }




     getShoppingLists = (q)=>{

       axios.get(`${baseURL}/shoppinglists` + q
           ,{headers: {"Authorization": localStorage.getItem("token")}})
           .then(function(response)
           {this.setState({
                   shoppingLists: response.data.shoppinglists


                 });

               }.bind(this));
       };


 render() {
   let search = <div className="input-group pull-right col-md-4">
            <input type="email" onInput={this.onSearchInput} name="search" className="form-control" placeholder="search shopping list" />
            <button >  <span className="input-group-addon"><i className="material-icons prefix">search</i></span></button>
        </div>;

   return (
     <div className="input-group pull-right col-md-4">

 {search}
</div>



   );
}
}

export default Search
