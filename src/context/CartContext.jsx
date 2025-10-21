// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from "react";

// Create context
const CartContext = createContext();

// Initial state
const initialState = {
  cart: [],
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      // If item already exists, update quantity
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id,
        console.log(action.payload.id)
      );

      if (existingIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }

      // If item is new, add with quantity 1
      return {
        ...state,
        cart: [...state.cart, { ...action.payload}],
      };

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // remove if quantity 0 or less
        return { ...state, cart: state.cart.filter((i) => i.id !== id) };
      }
      const updated = state.cart.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      return { ...state, cart: updated };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ cart: state.cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook for using cart
export function useCart() {
  return useContext(CartContext);
}
