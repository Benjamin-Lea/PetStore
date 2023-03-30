import React, { Component } from 'react';
import {ItemInfo} from "./ItemInfo.js";

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
        return this.state.data.filter((item) => {
            if (this.props.id == item.id)
                return item;
        });
    }

    renderPet() {
        let pet = this.matchName();
        if (pet.length != 0) {
            return this.state.data.filter((item) => {
                if (this.props.id == item.id)
                    return item;
            }).map(item => (
                <div key={item.id}>
                    <ItemInfo {...item} />
                </div>
            ))
        } else {
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