import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddItem extends Component {

  constructor() {
    super();
    this.state = {
      listName: '',
      itemName: '',
      newItem: {}
    }
  }

  handleChange(e) {
    this.setState({ itemName: e.target.value });
    this.setState({ listName: this.props.idName });
    this.setState({ newItem: { 'name': e.target.value } });
  }

  handleSubmit(e) {
    // e.preventDefault(); // this prevents the page from reloading -- do not delete this line!
    // should be this.props.HandleAddItem
    // this.props.addItem(this.state.newItem);
    fetch('/addItem', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(
        {
          listName: this.state.listName,
          itemName: this.state.itemName
        }
      )
    });
    console.log(this.state.listName + this.state.itemName);
    this.setState({
      list: '',
      items: [],
      multipleItems: false
    });
  }


  render() {
    var divName = 'add' + this.props.idName;
    return (
      <div className='addItemDiv'>
        <form ref='form' class="row g-3" onSubmit={this.handleSubmit.bind(this)}>
          <div id={divName} ref={divName} class="col"> 
            <input 
              type='text' 
              class="form-control form-control-sm" 
              placeholder="Add new item to list" 
              ref='id' 
              value={this.state.itemName} 
              onChange={this.handleChange.bind(this)} 
             />
          </div>
          <div class="col-auto">
            <button 
              class="btn btn btn-secondary btn-sm" 
              type="submit" 
              >Add Item
            </button>
          </div>
        </form>
      </div>
    );
  }

}

export default AddItem;
