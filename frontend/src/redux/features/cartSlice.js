import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  cartItems: sessionStorage.getItem('cartItems')
    ? JSON.parse(sessionStorage.getItem('cartItems'))
    : [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    // Add or Update Item
    setCartItem: (state, action) => {
		const item = action.payload;
		const isItemExist = state.cartItems.find((i) => i.product === item.product);
	  
		if (isItemExist) {
		  // Update existing item quantity
		  state.cartItems = state.cartItems.map((i) =>
			i.product === isItemExist.product ? item : i
		  );
		  toast.success('Item quantity updated');
		} else {
		  // Add new item to cart
		  state.cartItems.push(item);
		  toast.success('Item added to cart');
		}
	  
		sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
	  
		// Log the updated cart items and count
		console.log('Cart items:', state.cartItems);
		const cartItemsCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
		console.log('Cart items count:', cartItemsCount);  // This logs the total count
	  },
	  

    // Remove Item
    removeCartItem: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.product !== productId);
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.success('Item removed from cart');

      // Log the cart items after removal
      console.log("Updated Cart Items after Removal:", state.cartItems);
    },

    // Clear Cart
    clearCart: (state) => {
      state.cartItems = [];
      sessionStorage.removeItem('cartItems');
      toast.success('Cart cleared');
      
      // Log after clearing cart
      console.log("Cart Cleared:", state.cartItems);
    },

    // Save Shipping Info
    saveShippingInfo: (state, action) => {
      state.shippingData = action.payload;
      sessionStorage.setItem('shippingInfo', JSON.stringify(state.shippingData));
    },
  },
});

export const { setCartItem, removeCartItem, clearCart, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
