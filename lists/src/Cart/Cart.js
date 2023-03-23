import React, { Component } from 'react';
import { Offcanvas } from 'react-bootstrap';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            cart: {}
        };
    }

    // our cart is stored in local storage as a dictionary (id, quantity)
    componentDidMount() {
        // get the cart from local storage
        // var cart = JSON.parse(localStorage.getItem('cart'));
    }

    render() {
        return(
            <Offcanvas show={this.state.open} onHide={() => this.setState({ open: false })} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-column" style={{ gap: "1rem" }}>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <span className="fs-2">Item Name</span>
                            <span className="ms-2 text-muted"> $10.00</span>    
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <span className="fs-2">Item Name</span>
                            <span className="ms-2 text-muted"> $10.00</span>    
                        </div>  
                        <div className="d-flex justify-content-between align-items-baseline">
                            <span className="fs-2">Item Name</span>
                            <span className="ms-2 text-muted"> $10.00</span>    
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <span className="fs-2">Item Name</span>
                            <span className="ms-2 text-muted"> $10.00</span>
                            </div>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "1rem" }}>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <span className="fs-2">Total</span>
                            <span className="ms-2 text-muted"> $40.00</span>    
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        )
    }

}

export default Cart;