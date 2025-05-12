'use client';

import Link from "next/link";
import { useSelector } from "react-redux";

import type { RootState } from "@/store";

import CheckoutStatus from "../checkout-status";
import Item from "./item";

// Define the type for a cart item based on usage
interface CartItem {
  id: string; // Changed from number to string
  name: string;
  price: number;
  count: number;
  thumb: string;
  color?: string; // Assuming color and size might be optional based on context
  size?: string;
}

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item: CartItem) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th />
                </tr>

                {cartItems.map((item: CartItem) => (
                  <Item
                    key={item.id.toString()} // Changed key prop
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={item.color || ''} // Changed color prop
                    price={item.price}
                    size={item.size || ''} // Changed size prop
                    count={item.count}
                  />
                ))}
              </tbody>
            </table>
          )}

          {cartItems.length === 0 && <p>Nothing in the cart</p>}
        </div>

        <div className="cart-actions">
          <Link href="/products" className="cart__btn-back">
            <i className="icon-left" /> Continue Shopping
          </Link>
          <input
            type="text"
            placeholder="Promo Code"
            className="cart__promo-code"
          />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Total cost <strong>${priceTotal().toFixed(2)}</strong>
            </p>
            <Link
              href="/cart/checkout"
              className="btn btn--rounded btn--yellow"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;