import { useSelector } from 'react-redux';

export const useCart = () => {
  // Get cart items from Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Log the cart state to see the data
  console.log("Current Cart Items:", cartItems);

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // If cart is empty, log a message
  if (cartItemsCount === 0) {
    console.log("Cart is empty.");
  }

  return { cartItemsCount };
};
