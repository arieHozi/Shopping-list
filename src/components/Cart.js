import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  render() {
    const { cartitems } = this.props;
    console.log(cartitems);

    return (
      <div>
        {cartitems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartitems.length} in the cart
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartitems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      Price:{formatCurrency(item.price)}
                      {"    "} items: {item.count}
                      {"     "}
                      <button className="btu button_add">+</button>
                      <button className="btu button_remove">-</button>
                      <button onClick={() => this.props.removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartitems.length !== 0 && (
            <div className={"cart"}>
              <div className="total">
                <div>
                  Total:{"  "}
                  {formatCurrency(
                    cartitems.reduce(
                      (total, item) => total + item.price * item.count,
                      0
                    )
                  )}
                </div>
                <button className="button-primary">Proceed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
