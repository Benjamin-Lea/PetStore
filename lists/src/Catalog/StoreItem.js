import React, { Component } from 'react';
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


class StoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            quantity: 0
        }
    }

    increaseCartQuantity(id) {
        this.setState({ quantity: this.state.quantity + 1 });
        console.log(this.state.quantity);
    }

    decreaseCartQuantity(id) {
        if (this.state.quantity <= 1) {
            this.removeFromCart(id);
        }
        else {
            this.setState({ quantity: this.state.quantity - 1 });
        }
        console.log(this.state.quantity);
    }

    removeFromCart(id) {
        this.setState({ quantity: 0 });
        console.log(this.state.quantity);
    }

    render() {
        return (
            <Card>
                <Card.Img
                    variant="top"
                    src={this.state.item.imageURL}
                    height="200px"
                    style={{ objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4" >
                        <span className="fs-2"> {this.state.item.name}</span>
                        <span className="ms-2 text-muted"> ${this.state.item.price}</span>
                    </Card.Title>
                    <div className="mt-auto">
                        {/* Add to cart button section */}
                        {this.state.quantity === 0 ? (
                            <Button className="w-100" onClick={this.increaseCartQuantity.bind(this)}>
                                + Add To Cart
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }} >
                                    {this.state.item.type === "supply" ? (<Button onClick={this.decreaseCartQuantity.bind(this)}>-</Button>) : null}
                                    <div>
                                        <span className="fs-3">{this.state.quantity}</span> in cart
                                    </div>
                                    {this.state.item.type === "supply" ? (<Button onClick={this.increaseCartQuantity.bind(this)}>+</Button>) : null}
                                </div>
                                <Button onClick={this.removeFromCart.bind(this)} variant="danger" size="sm" >
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