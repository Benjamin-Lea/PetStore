import React, { Component } from 'react';
class PetComponent extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        };
    }

    componentDidMount() {
        fetch('/catalogData')
        .then(response => response.json())
        .then(responseData => {
          this.setState({ data: responseData });
        })
    }

    // match name to the name in the data
    matchName() {
        console.log("Foo 1");
        console.log(this.props.id);
        console.log("Foo 2");
        return this.state.data.filter((item) => {
            console.log(item.id);
            if (this.props.id == item.id)
                return item;
        });
    }

    renderPet() {
        let pet = this.matchName();
        if(pet.length != 0) {
            return (
                <div>
                    <h1>{pet[0].name}</h1>
                    <img src={pet[0].imageURL}  alt="Pet Image" />
                    <h1>{pet[0].price}</h1>
                </div>
            );
        }
        else{
            return (
                <div>
                    <h1>Not Found</h1>
                </div>
            );
        }

    }

    render() {
        return (
            <div>
                {this.renderPet()}
            </div>
        );
    }
}

export default PetComponent;