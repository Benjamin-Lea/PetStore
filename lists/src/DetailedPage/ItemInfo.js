import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../Cart/CartContext";

export function ItemInfo(props) {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getQuantity,
  } = useCart();
  const quantity = getQuantity(props.id);

  const handleAddToCart = () => {
    increaseCartQuantity(props.id);
  };

  const handleDecrease = () => {
    decreaseCartQuantity(props.id);
  };

  const handleIncrease = () => {
    increaseCartQuantity(props.id);
  };

  const handleRemove = () => {
    removeFromCart(props.id);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center",}}>
    <Card className="bg-transparent" style={{display: "inline-block", textAlign: "center", maxWidth: "500px"}}>
      <Card.Header as="h1">{props.name}</Card.Header>
      <Card.Img
        variant="top"
        src={props.imageURL}
        alt={props.imageURL}
        style={{ maxWidth: "400px", margin: "auto" }}
      />
      <Card.Body>
        <Card.Text style={{ marginBottom: "1rem" }}>
          Description: {props.description}
        </Card.Text>
        {props.type === "animal" && (
        <Card.Text style={{ marginBottom: "1rem" }}>
          Breed: {props.breed}
        </Card.Text>
        )}
        {props.type === "animal" && (
        <Card.Text style={{ marginBottom: "1rem" }}>
          Age: {props.age}
        </Card.Text>
        )}
        {props.type === "animal" && (
        <Card.Text style={{ marginBottom: "1rem" }}>
          Gender: {props.gender}
        </Card.Text>
        )}
        <Card.Text style={{ fontWeight: "bold" }}>
          Price: {props.price}
        </Card.Text>
        {quantity === 0 ? (
          <Button onClick={handleAddToCart} variant="primary">
            + Add To Cart
          </Button>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.type === "supply" && (
              <Button onClick={handleDecrease} variant="outline-primary">
                -
              </Button>
            )}
            <div style={{ margin: "0 1rem", fontWeight: "bold" }}>
              <span className="fs-3">{quantity}</span> in cart
            </div>
            {props.type === "supply" && (
              <Button onClick={handleIncrease} variant="outline-primary">
                +
              </Button>
            )}
            <Button
              onClick={handleRemove}
              variant="danger"
              size="sm"
              style={{ marginLeft: "1rem" }}
            >
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
    </div>
  );
}
