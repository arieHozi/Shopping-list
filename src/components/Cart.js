import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";

class Cart extends Component {
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
    const { cartItems } = this.props;

    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart
          </div>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
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
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className={"cart"}>
                <div className="total">
                  <div>
                    Total:{"  "}
                    {formatCurrency(
                      cartItems.reduce(
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
                    <Fade right cascade>
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
                    </Fade>
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
const mapStateToProps = (state) => {
  //select what part of the state you want to map to Cart propertis
  return {
    cartItems: state.cart.cartItems, //cart is the reducer name on combine method and cartItems is part of the state as declered in the reducer
  };
};
export default connect(mapStateToProps, { removeFromCart })(Cart);
