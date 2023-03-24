import React, { Component } from 'react';
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class StoreItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Img
                    variant="top"
                    src={this.props.item.imageURL}
                    height="200px"
                    style={{ objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4" >
                        <span className="fs-2"> {this.props.item.name}</span>
                        <span className="ms-2 text-muted"> ${this.props.item.price}</span>
                    </Card.Title>
                    <div className="mt-auto">
                        {/* Add to cart button section */}
                        {(this.props.getQuantity(this.props.item.id) === 0) ? (
                            <Button className="w-100" onClick={this.props.increaseCartQuantity.bind(this)}>
                                + Add To Cart
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }} >
                                    {this.props.item.type === "supply" ? (<Button onClick={this.props.decreaseCartQuantity.bind(this)}>-</Button>) : null}
                                    <div>
                                        <span className="fs-3">{this.props.getQuantity(this.props.item.id)}</span> in cart
                                    </div>
                                    {this.props.item.type === "supply" ? (<Button onClick={this.props.increaseCartQuantity.bind(this)}>+</Button>) : null}
                                </div>
                                <Button onClick={this.props.removeFromCart.bind(this)} variant="danger" size="sm" >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default StoreItem;