import { Offcanvas, Button, Stack } from 'react-bootstrap';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from "./CartContext";
import { CartItem } from "./CartItem";
import { useEffect, useState } from 'react';

export function Cart({ isOpen }) {
    const { closeCart, cartQuantity, cart } = useCart();
    const [storeItems, setStoreItems] = useState([]);
    const storeString = JSON.stringify(storeItems);

    // This constantly updates Probably not good but whatever for now
    useEffect(() => {
        fetch('/catalogData')
            .then(response => response.json())
            .then(data => setStoreItems(data))
        console.log("Store items in useEffect", storeItems);
    }, [storeString]);

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} storeItems={storeItems} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total ${" "}
                        {
                            cart.reduce((total, item) => {
                                const itemData = storeItems.find((storeItem) => storeItem.id === item.id);
                                if (itemData == null) return total;
                                return total + itemData.price * item.quantity;
                            }, 0)
                        }
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}