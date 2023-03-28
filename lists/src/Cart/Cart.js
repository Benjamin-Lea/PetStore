import { Offcanvas, Button, Stack } from 'react-bootstrap';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from "./CartContext";
import { CartItem } from "./CartItem";
import { useEffect, useState } from 'react';

export function Cart({ isOpen }) {
    const { closeCart, checkout, cartQuantity, cart } = useCart();
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
                    <form className="d-flex flex-column checkoutForm" onSubmit={checkout}>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required="true" placeholder="
                        Enter your email" />
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" required="true" placeholder="
                        Enter your address" />
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="tel" className="form-control" id="phone" required="true" placeholder="
                        Enter your phone number" />
                        <label htmlFor="card" className="form-label">Card</label>
                        <input type="text" className="form-control" id="card" required="true" placeholder="
                        Enter your card number" />
                        <label htmlFor="exp" className="form-label">Expiration</label>
                        <input type="text" className="form-control" id="exp" required="true" placeholder="
                        Enter your card expiration" />
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cvv" required="true" placeholder="
                        Enter your card CVV" />
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" required="true" placeholder="
                        Enter your zip code" />
                        <Button className="w-100 mt-3" type="submit">Checkout</Button>
                    </form> 
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}