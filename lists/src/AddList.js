import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: '',
      items: []
    };
  }

  // Geneal idea of handling forms from https://reactjs.org/docs/forms.html.
  handleChange(e) {
    this.setState({ list: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault(); // this prevents the page from reloading -- do not delete this line!
    this.setState({ list: this.state.list });
    this.props.addList(this.state);
    this.setState({ list: '' })
  }

  render() {
    return (
      <div id="addListDiv">
        <form onSubmit={this.handleSubmit.bind(this)} class="row g-3">
          <div id='addList' class="col">
            <input type="text" class="form-control" placeholder="Add new list:" ref='id' id='newID' value={this.state.list} onChange={this.handleChange.bind(this)} />
          </div>
          <div class="col-auto">
            <button class="btn btn-light" type="submit" >Add List</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddList;

