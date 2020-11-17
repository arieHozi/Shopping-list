import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      address: "",
      showCheckOut: false,
    };
  }
  handleinput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submithandler = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartitems: this.props.cartitems,
    };
    this.props.cretaeOrder(order);
  };
  render() {
    const { cartitems } = this.props;

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
            <div>
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
                  <button
                    onClick={() => this.setState({ showCheckOut: true })}
                    className="button-primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckOut === true && (
                <div className="cart">
                  <form onSubmit={this.submithandler}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleinput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleinput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleinput}
                        ></input>
                      </li>
                      <li>
                        <button type="submit" className="button-primary">
                          CheckOut
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
