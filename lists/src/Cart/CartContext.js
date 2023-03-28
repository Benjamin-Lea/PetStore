import { createContext, useContext, useState } from 'react';
import { Cart } from './Cart.js';
import { useLocalStorage } from './useLocalStorage.js';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useLocalStorage("shopping-cart", []);

    const cartQuantity = cart.reduce((quantity, item) => quantity + item.quantity, 0);
    
    const openCart = () => { setIsOpen(true) };
    const closeCart = () => { setIsOpen(false) };

    function increaseCartQuantity(id) {
        console.log("increaseCartQuantity");
        // make change to cart and return cart
        setCart(currentItems => {
            if (currentItems.find((item) => item.id === id) == null) {
                return [...currentItems, { id: id, quantity: 1 }]
            }
            else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id) {
        console.log("decreaseCartQuantity");
        setCart(currentItems => {
            if (currentItems.find((item) => item.id === id)?.quantity === 1) {
                return currentItems.filter((item) => item.id !== id);
            }
            else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }
    function removeFromCart(id) {
        setCart(currentItems => {
            return currentItems.filter((item) => item.id !== id);
        })
    }
    function getQuantity(id) {
        return cart.find((item) => item.id === id)?.quantity || 0;
    }

    function checkout() {
        setCart([]);   
        alert("Thank you for your purchase! \n Your order will be shipped to you shortly.");
    }

    return (
        <CartContext.Provider value={{increaseCartQuantity, decreaseCartQuantity, removeFromCart, getQuantity, openCart, closeCart, checkout, cartQuantity, cart}}>
            {children}
            <Cart isOpen={isOpen} />
        </CartContext.Provider>
    )
}