import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class SlideShowItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, // this is the name of the list
            item: this.props.item // this is the item object
        };
    }

    renderItems() {
        const item = this.props.item;
        const list = this.props.list;
        const imageStyle = {
            height: "50vh",
            maxWidth: "75%",
            margin: "auto",
        }
        if (item != null) {
            return(
                <div>
                    <h2>{list}</h2>
                    <h3>{item.name}</h3>
                    <img style={imageStyle} src={item.image} alt={item.name} />
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