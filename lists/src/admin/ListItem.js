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

  render() {
    let name = this.props.name;
    let breed = this.props.breed;
    let age = this.props.age;
    let gender = this.props.gender;
    let imageURLs = this.props.imageURLs;
    const imageStyle = {
      height: "50vh",
      maxWidth: "75%",
      margin: "auto",
  }

    return (
      <span onClick={this.handleClick.bind(this)} style={{ color: this.state.color }}>
        <div class="mx-auto">
          <div class="card">
            <img src={imageURLs} class="card-img-top" alt="Pet Image" style={imageStyle} />
            <div class="card-body">
              <h5 id="card-text">Pet Name: {name}</h5>
              <p id="card-text">Age: {age}</p>
              <p id="card-text">Breed: {breed}</p>
              <p id="card-text">Gender: {gender}</p>
            </div>
          </div>
        </div>
      </span>
    );
  }
}
export default ListItem;

