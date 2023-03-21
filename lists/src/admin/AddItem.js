import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddItem extends Component {

  constructor() {
    super();
    this.state = {
      listName: '',
      petName: '',
      imageURL: '',
      breed: '',
      age: '',
      gender: 'male',
      newItem: {}
    }
  }

  handleChange(e, property) {
    this.setState({ [property]: e.target.value });
    this.setState({ listName: this.props.idName });
    this.setState({ newItem: { [property]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/addItem', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(
        {
          listName: this.state.listName,
          petName: this.state.petName,
          imageURL: this.state.imageURL,
          breed: this.state.breed,
          age: this.state.age,
          gender: this.state
        }
      )
    });
    console.log(this.state.listName + this.state.petName);
    this.setState({
      petName: '',
      imageURL: '',
      breed: '',
      age: ''
    });
  }

  render() {
    var divName = 'add' + this.props.idName;
    return (
      <div className="addItemDiv">
        <form ref="form" className="row g-3" onSubmit={this.handleSubmit.bind(this)}>
          <div id={divName} ref={divName} className="col">
            <input type="text" className="form-control form-control-sm" placeholder="Pet Name" ref="petName" value={this.state.petName} onChange={(e) => this.handleChange(e, "petName")} />
            <input type="text" className="form-control form-control-sm" placeholder="Image URL" ref="imageURL" value={this.state.imageURL} onChange={(e) => this.handleChange(e, "imageURL")} />
            <input type="text" className="form-control form-control-sm" placeholder="Breed" ref="breed" value={this.state.breed} onChange={(e) => this.handleChange(e, "breed")} />
            <input type="number" className="form-control form-control-sm" placeholder="Age" ref="age" value={this.state.age} onChange={(e) => this.handleChange(e, "age")} />
            <p> </p>
            <input type="radio" name="gender" value="male" checked={this.state.gender === "male"} onChange={(e) => this.handleChange(e, "gender")} />
            <label for="male">Male</label>
            <input type="radio" name="gender" value="female" checked={this.state.gender === "female"} onChange={(e) => this.handleChange(e, "gender")} />
            <label for="female">Female</label>
          </div>
          <div><button className="btn btn btn-secondary btn-sm" type="submit">Add Pet</button></div>
        </form>
      </div>
    );
  }

}


export default AddItem;
