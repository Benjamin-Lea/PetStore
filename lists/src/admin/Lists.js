import React, { Component } from 'react';
import List from './List.js';
import 'bootstrap/dist/css/bootstrap.min.css';
const { v4: uuidv4 } = require('uuid');


class Lists extends Component {

  render() {
    // If there are no lists, display a relevant message
    if(this.props.lists.length === 0) {
      return (
        <div id="listDiv" className="List">
          <h3 style={{color: 'black'}}> Add new animal to get started!</h3>
        </div>
      );
    }

    // Otherwise, for each list, create a div
    var items = this.props.items;
    var lists = this.props.lists;
    var addItem = this.props.addItem;
    return (
      <div key={uuidv4()}>
      {lists.map(function(listName) {
        return (
          <List name={listName} items={items[listName]} addItem={addItem.bind(this)} key={uuidv4()} />
        )
      })}
      </div>
    );
  }
}

export default Lists;
