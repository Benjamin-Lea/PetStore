import React, { Component } from 'react';
import AddMerchandise from './AddMerchandise.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class Merchandise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplies: [],
        };
    }

    componentDidMount() {
        fetch('/merchandiseData')
            .then(response => response.json())
            .then(supplies => this.setState({ supplies }))
            .catch(error => console.log(error));
    }

    handleRemove(name) {
        console.log("Removing item: " + name);
        window.location.reload();
        fetch(`/api/supplies/${name}`, {
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
        const { supplies } = this.state;
        const imageStyle = {
            maxWidth: "75%",
            maxHeight: "75%",
            margin: "auto",
            width: "auto",
            height: "auto",
        }
        return (

            <div id="listsDiv">
            <AddMerchandise />
                <div id="listDiv" >
                    <h3> Merchandise Items: </h3>
                    {supplies.map((item, index) => (
                        <ul class="suppliesListUL" key={index}>
                            <div class="card mx-auto" id="customCard">
                                <img src={item.imageURL} class="card-img-top" alt="Pet Image" style={imageStyle} />
                                <div class="card-body">
                                    <h5 id="card-text">Item:  {item.name}</h5>
                                    <p id="card-text">Price: ${item.price}</p>
                                    <button class="btn btn-danger btn-sm" onClick={() => this.handleRemove(item.name)}>Remove</button>
                                </div>
                            </div>

                        </ul>
                    ))}
                </div>
            </div>
        );
    }
}


export default Merchandise;
