import React, { Component } from 'react';
import ListItem from './ListItem.js';
import AddItem from './AddItem.js';
import 'bootstrap/dist/css/bootstrap.min.css';
const { v4: uuidv4 } = require('uuid');

class List extends Component {

  render() {
    var name = this.props.name;
    var items = this.props.items;
    
    if (items) {
      return (
        <div id={name} key={uuidv4()}>
          <div id="listDiv">
            <h3>{name}</h3>
          </div>
          <ul class="listUL">
            {items.animalNames.map(function (name, index) {
              return (
                <li key={uuidv4()}>
                  <ListItem name={name} 
                  breed={items.animalBreeds[index]} 
                  age={items.animalAges[index]} 
                  gender={items.animalGenders[index]}
                  imageURLs={items.animalImageURLs[index]} 
                  price={items.animalPrices[index]}
                    key={uuidv4()} />
                </li>
              )
            })}
          </ul>
          <AddItem idName={name} addItem={this.props.addItem.bind(this)} />
        </div>
      )
    }
    return (
      <div id={name} key={uuidv4()}>
        <div id="listDiv">
          <h3>{name} List</h3>
        </div>
        <AddItem idName={name} addItem={this.props.addItem.bind(this)} />
      </div>
    )

  }
}

export default List;
