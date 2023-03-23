class CartInterface {
    constructor() {
        this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    increaseCartQuantity(id) {
        if (!this.cart[id]) {
            this.cart[id] = 1;
        }
        else {
            this.cart[id] = this.cart[id] + 1;
        }
        this.saveCart();
    }
    decreaseCartQuantity(id) {
        if (this.cart[id] <= 1) {
            this.removeFromCart(id);
        }
        else {
            this.cart[id] = this.cart[id] - 1;
        }
        this.saveCart();
    }
    removeFromCart(id) {
        this.cart[id] = 0;
        this.saveCart();
    }
    getItemQuantity(id) {
        return this.cart[id];
    }

}

export default new CartInterface();