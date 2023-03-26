import React, { Component } from 'react';
import Lists from './Lists.js';
import AddList from './AddList.js';
import AdminNav from './adminNav.js';
import '../app.css';

class AdminPets extends Component {

  constructor() {
    super();
    this.state = {
      lists: [], // this holds the name of each list
      pets: {}, // this property names of this object are the names of the lists; their values are arrays of the items in each list
      token: '',
    };
  }

  /**
   * This function takes the state of an AddList component as its parameter
   * and updates the state of this App component by adding a new entry to the "lists"
   * array and then adding a new property in the "items" object that has the same name
   * as the value put into the "lists" array. It should then re-render this App component.
   */
  handleAddList(s) {
    let newLists = this.state.lists.concat(s.list);
    let newPets = { ...this.state.pets, [s.list]: [] }; // ... is the spread operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    this.setState({ lists: newLists, pets: newPets });
  }

  /**
   * This function takes the state of an AddItem component as its parameter
   * and updates the state of this App component by adding a new value to the 
   * appropriate array in the "items" property of the state. Keep in mind that
   * the property names of "items" are the names of each list, which is mapped
   * to an array of the items in that list. After updating the "items" part of 
   * the state, this function  should then re-render this App component.
   */
  handleAddPet(s) {
    // Implement this function!
    // refresh the page to see the new item 
    this.setState({ pets: { ...this.state.pets, [s.listName]: this.state.pets[s.listName].concat(s.newPet) } });
  }


  /**
   * This function is called when this component is first rendered.
   * It fetches the data from the server and then updates the state
   * of this component with the data.
   * Insparation from https://reactjs.org/docs/faq-ajax.html
   */
  componentDidMount() {
    let token = localStorage.getItem('token');
    fetch('/authorized', {
      headers: {
        'token': token
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status != true) {
          window.location.href = '/admin/login';
        }
      }).catch((err) => { console.log(err); });
    fetch('/animalData')
      .then(response => response.json())
      .then(listsData => {
        this.setState({ lists: listsData.lists, pets: listsData.pets });
      })
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <div>
        <AdminNav />
        <AddList addList={this.handleAddList.bind(this)} />
        <div id="listsDiv" className="List">
          <Lists lists={this.state.lists} pets={this.state.pets} addPet={this.handleAddPet.bind(this)} />
        </div>
      </div>
    );
  }

}

export default AdminPets;
