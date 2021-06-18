import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemovedHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItem = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemovedHandler.bind(null, item.id)}
    />
  ));
  const hasItem = cartCtx.items.length > 0;

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>{cartItem}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
