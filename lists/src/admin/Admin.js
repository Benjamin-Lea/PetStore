import React, { Component } from 'react';
import Lists from './Lists.js';
import AddList from './AddList.js';
import '../app.css';

class Admin extends Component {

  constructor() {
    super();
    this.state = {
      lists: [], // this holds the name of each list
      items: {}, // this property names of this object are the names of the lists; their values are arrays of the items in each list
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
    let newItems = { ...this.state.items, [s.list]: [] }; // ... is the spread operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    this.setState({ lists: newLists, items: newItems });
  }

  /**
   * This function takes the state of an AddItem component as its parameter
   * and updates the state of this App component by adding a new value to the 
   * appropriate array in the "items" property of the state. Keep in mind that
   * the property names of "items" are the names of each list, which is mapped
   * to an array of the items in that list. After updating the "items" part of 
   * the state, this function  should then re-render this App component.
   */
  handleAddItem(s) {
    // Implement this function!
    // refresh the page to see the new item 
    this.setState({ items: { ...this.state.items, [s.listName]: this.state.items[s.listName].concat(s.newItem) } });
  }


  /**
   * This function is called when this component is first rendered.
   * It fetches the data from the server and then updates the state
   * of this component with the data.
   * Insparation from https://reactjs.org/docs/faq-ajax.html
   */
  componentDidMount() {
    fetch('/animalData')
      .then(response => response.json())
      .then(listsData => {
        this.setState({ lists: listsData.lists, items: listsData.items });
      })
  }

  /**
   * Renders the component.
   */
  render() {
    console.log(this.state);
    return (
      <div className="Admin">
        <AddList addList={this.handleAddList.bind(this)} />
        <div id="listsDiv" className="List">
          <Lists lists={this.state.lists} items={this.state.items} addItem={this.handleAddItem.bind(this)} />
        </div>
      </div>
    );
  }

}

export default Admin;
