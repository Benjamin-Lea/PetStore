import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from "../Cart/CartContext";

export function ItemInfo(props) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, getQuantity } = useCart();
  const quantity = getQuantity(props.id);

  return (
    <Card>
      <Card.Header as="h1">{props.name}</Card.Header>
      <Card.Img variant="top" src={props.imageURL} alt={props.imageURL} style={{ maxWidth: '400px' }} />
      <Card.Body>
        <Card.Text>
          {"Item Description Here... More info needed... test 123"}
        </Card.Text>
        <Card.Text>Price: {props.price}</Card.Text>
        {quantity === 0 ? (
          <Button
            className="w-100"
            onClick={() => increaseCartQuantity(props.id)}
          >
            + Add To Cart
          </Button>
        ) : (
          <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
              {props.type === "supply" ? (
                <Button onClick={() => decreaseCartQuantity(props.id)}>-</Button>
              ) : null}
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              {props.type === "supply" ? (
                <Button onClick={() => increaseCartQuantity(props.id)}>+</Button>
              ) : null}
            </div>
            <Button
              onClick={() => removeFromCart(props.id)}
              variant="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
