import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  removeFromCart,
  decreaseCart,
  addtoCart,
  clearCart,
  getTotals,
} from "../redux/CartSlice";
function Cart() {
  const cart = useSelector((state) => state.cart);
  const { cartTotalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <div className="cart-container">
      <h2>Vos Commandes</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>No commandes</p>
          <div className="start-commanding">
            <Link to="/menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              <span>back to menu</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="item-title">items</h3>
            <h3 className="Size">Size</h3>
            <h3 className="price">price</h3>
            <h3 className="quantity">Personalisation</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems.map((item, index) => {
              return (
                <div className="cart-item" key={index}>
                  <div className="cart-product">
                    <img src={item.img} />
                    <div>
                      <h3>{item.name}</h3>
                      <button onClick={() => handleRemoveFromCart(item)}>
                        remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-size">{item.prices.size}</div>
                  <div className="cart-product-price">{item.prices.price}</div>

                  <div className="cart-product-quantity">
                    <ul>
                      <h4>sauces</h4>
                      {item.sauces.map((sauce) => {
                        return (
                          <li>
                            {sauce.sauce} +({sauce.price})
                          </li>
                        );
                      })}
                    </ul>
                    <Link to={`/menu/item/${item.y}`}>Modify Sauces</Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <button
              className="clear-cart"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">{cartTotalAmount}$</span>
              </div>
              <p>taxes and shipping calculated at checkout</p>
              <button>checkout</button>
              <div className="continue-commanding">
                <Link to="/menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                  </svg>
                  <span>back to menu</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
