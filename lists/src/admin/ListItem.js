import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = { color: 'black' };
  }

  handleClick() {
    // Implement this function!
    // toggle the color of the text between black and grey
    if (this.state.color === 'black') {
      this.setState({ color: 'grey' });
    }
    else {
      this.setState({ color: 'black' });
    }
  }

  handleRemove(name) {
    window.location.reload();
    fetch(`/api/items/${name}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Item removed successfully');
      } else {
        console.log('Failed to remove item');
      }
    })
    .catch(error => console.error(error));
  }


  render() {
    let name = this.props.name;
    let breed = this.props.breed;
    let age = this.props.age;
    let gender = this.props.gender;
    let imageURLs = this.props.imageURLs;
    let price = this.props.price;
    const imageStyle = {
      maxWidth: "75%",
      maxHeight: "75%",
      margin: "auto",
      width: "auto",
      height: "auto",
    }
    return (
      <div class="mx-auto">
        <div class="card" id="customCard">
          <img src={imageURLs} class="card-img-top" alt="Pet Image" style={imageStyle} />
          <div class="card-body">
            <h5 id="card-text">Pet Name: {name}</h5>
            <p id="card-text">Age: {age}</p>
            <p id="card-text">Breed: {breed}</p>
            <p id="card-text">Gender: {gender}</p>
            <p id="card-text">Price: {price}</p>
            <button class="btn btn-danger btn-sm" onClick={() => this.handleRemove(name)}>Remove</button>
          </div>
        </div>
      </div>
    );
  }
}
export default ListItem;

