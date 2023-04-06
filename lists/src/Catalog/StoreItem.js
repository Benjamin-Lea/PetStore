import { Component } from 'react';
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from "../Cart/CartContext";

export function StoreItem(props) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, getQuantity } = useCart();
    const quantity = getQuantity(props.id);

    const gotoItemPage = (item) => {
        window.location.href = '/petDetails/' + item.id;
    }

    return (
        <Card>
            <Card.Img
                variant="top"
                src={props.imageURL}
                height="200px"
                style={{ objectFit: "cover", cursor: 'pointer'}}
                onClick={() => gotoItemPage(props)}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4" >
                    <span className="fs-2"> {props.name}</span>
                    <span className="ms-2 text-muted"> ${props.price}</span>
                </Card.Title>
                <div className="mt-auto">
                    {/* Add to cart button section */}
                    {(quantity === 0) ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(props.id)}>
                            + Add To Cart
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }} >
                                {props.type === "supply" ? (<Button onClick={() => decreaseCartQuantity(props.id)}>-</Button>) : null}
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                {props.type === "supply" ? (<Button onClick={() => increaseCartQuantity(props.id)}>+</Button>) : null}
                            </div>
                            <Button onClick={() => removeFromCart(props.id)} variant="danger" size="sm" >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}