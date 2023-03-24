export default function cartReducer(cart, action) {
    switch (action.type) {
      case "increaseCartQuantity":{
        console.log("increaseCartQuantity");
        // make change to cart and return cart
        cart.find((item) => item.id === action.id) ? cart.find((item) => item.id === action.id).quantity += 1 : cart.push({ id: action.id, quantity: 1 });
        return cart;
    }
      case "decreaseCartQuantity":{
        console.log("decreaseCartQuantity");
        // make change to cart and return cart
        if (cart.find((item) => item.id === action.id) && cart.find((item) => item.id === action.id).quantity > 1) {
          cart.find((item) => item.id === action.id).quantity -= 1;
        }
        else
            cart = cart.filter((item) => item.id !== action.id);
        return cart;        
    }
      case "removeFromCart":{
        cart = cart.filter((item) => item.id !== action.id);
        return cart;
      }
      default:{
        console.log("Error: Invalid action type: "); console.log(action.type);
        throw Error("Invalid action type" + action.type);}
    }
  }