import React, { Component } from 'react';
import ListItem from './ListItem.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPet from './AddPet.js';
const { v4: uuidv4 } = require('uuid');

class List extends Component {

  render() {
    var name = this.props.name;
    var pets = this.props.pets;
    
    if (pets) {
      return (
        <div id={name} key={uuidv4()}>
          <div id="listDiv">
            <h3>{name}</h3>
          </div>
          <ul class="animallistUL">
            {pets.animalNames.map(function (name, index) {
              return (
                <li key={uuidv4()}>
                  <ListItem name={name} 
                  breed={pets.animalBreeds[index]} 
                  age={pets.animalAges[index]} 
                  gender={pets.animalGenders[index]}
                  imageURLs={pets.animalImageURLs[index]} 
                  price={pets.animalPrices[index]}
                  description={pets.animalDescriptions[index]}
                    key={uuidv4()} />
                </li>
              )
            })}
          </ul>
          <AddPet idName={name} addPet={this.props.addPet} />
        </div>
      )
    }
    return (
      <div id={name} key={uuidv4()}>
        <div id="listDiv">
          <h3>{name} List</h3>
        </div>
        <AddPet idName={name} addPet={this.props.addPet} />
      </div>
    )

  }
}

export default List;
