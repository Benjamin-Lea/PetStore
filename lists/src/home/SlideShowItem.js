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

    gotoDropDownItem(item) {
        window.location.href = '/petDetails/' + item.id;
    }

    renderItems() {
        const list = this.props.list;
        const name = this.props.name;
        const imageURLs = this.props.imageURLs;
        const id = this.props.id;
        const imageStyle = {
            height: "50vh",
            maxWidth: "75%",
            margin: "auto",
            cursor: 'pointer'
        }
        if (name != null) {
            return (
                <div>
                    <h2>{list}</h2>
                    <h3>{name}</h3>
                    <img style={imageStyle} src={imageURLs} alt={name} onClick={(event) => this.gotoDropDownItem(id)} />
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