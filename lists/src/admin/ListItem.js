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
    var item = this.props.item;
    var name = item.name;

    return (
      <span onClick={this.handleClick.bind(this)} style={{ color: this.state.color }}>
        <h5>{item}</h5>
      </span>
    );

  }

}
export default ListItem;

