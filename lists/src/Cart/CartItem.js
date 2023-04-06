import { useCart } from "./CartContext";
import { Button, Stack } from 'react-bootstrap';

export function CartItem(props) {
    const { id, quantity } = props.item;
    const { removeFromCart } = useCart();
    const item = props.storeItems.find((item) => item.id === id);

    if (item == null) return null;
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imageURL} style={{ width: "100px", height: "75px", objectFit: "cover" }} />
            <div className="me-auto">
                {item.name}{" "}
                {quantity > 1 && (
                    <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        x{quantity}
                    </span>
                )}
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    ${item.price}
                </div>
            </div>
            <div> ${item.price * quantity} </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>&times;</Button>
        </Stack>
    );
}