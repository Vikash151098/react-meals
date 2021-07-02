import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existItem = state.items[existItemIndex];
      let updatedItems;
      if (existItem) {
        const updatedItem = {
          ...existItem,
          amount: existItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return { items: updatedItems, totalAmount: updateTotalAmount };
    }

    case "REMOVE_ITEM": {
      const existItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existItem = state.items[existItemIndex];
      const updateTotalAmount = Math.abs(state.totalAmount - existItem.price);

      let updatedItems;
      if (existItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = { ...existItem, amount: existItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existItemIndex] = updatedItem;
      }
      return { items: updatedItems, totalAmount: updateTotalAmount };
    }
    case "CLEAR":
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
