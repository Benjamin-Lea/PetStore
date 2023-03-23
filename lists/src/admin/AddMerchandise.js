import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddMerchandise extends Component {

  constructor() {
    super();
    this.state = {
      itemName: '',
      imageURL: '',
      price: '',
    }
  }

  handleChange(e, property) {
    this.setState({ [property]: e.target.value });
  }

  handleSubmit(e) {
    window.location.reload();
    e.preventDefault();
    fetch('/addSuplies', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(
        {
          name: this.state.itemName,
          imageURL: this.state.imageURL,
          price: this.state.price
        }
      )
    });
    this.setState({
      petName: '',
      imageURL: '',
      price: ''
    });
  }

  render() {
    return (
      <div id="addSupplysDiv">
        <form onSubmit={this.handleSubmit.bind(this)} class="row g-3">
          <div class="col">
            <input type="text" className="form-control form-control-sm" placeholder="Item Name" ref="itemName" value={this.state.petName} onChange={(e) => this.handleChange(e, "itemName")} style={{ marginBottom: '10px' }} />
            <input type="text" className="form-control form-control-sm" placeholder="Image URL" ref="imageURL" value={this.state.imageURL} onChange={(e) => this.handleChange(e, "imageURL")} style={{ marginBottom: '10px' }} />
            <input type="number" className="form-control form-control-sm" placeholder="Price" ref="price" value={this.state.price} onChange={(e) => this.handleChange(e, "price")} style={{ marginBottom: '10px' }} />
            <button class="btn btn-light" type="submit" style={{ marginTop: '10px' }}>Add Item</button>
          </div>
        </form>
      </div>
    );
  }
}


export default AddMerchandise;
