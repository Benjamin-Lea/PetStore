import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class SlideShowItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, // this is the name of the list
            // name: this.props.name // this is the item object
        };
    }

    renderItems() {
        const list = this.props.list;
        const name = this.props.name;
        const imageURLs = this.props.imageURLs;
        const imageStyle = {
            height: "50vh",
            maxWidth: "75%",
            margin: "auto",
        }
        if (name != null) {
            return(
                <div>
                    <h2>{list}</h2>
                    <h3>{name}</h3>
                    <img style={imageStyle} src={imageURLs} alt={name} />
                </div>
            )
        }
    }

    render() {
        const list = this.props.list;
        return (
            <div id={list}>
                {this.renderItems()}
            </div>
        );
    }
}

export default SlideShowItem;