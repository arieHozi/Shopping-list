//feature-12
import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartitems: localStorage.getItem("cartitem")
        ? JSON.parse(localStorage.getItem("cartitem"))
        : [],
    };
  }

  removeFromCart = (product) => {
    console.log("product", product._id);

    const cartitems = this.state.cartitems.slice();
    this.setState({
      cartitems: cartitems.filter((item) => item._id !== product._id),
    });
    localStorage.setItem(
      "cartitem",
      JSON.stringify(cartitems.filter((item) => item._id !== product._id))
    );
  };
  addToCart = (product) => {
    let alreadtInCart = false;
    const cartitems = this.state.cartitems.slice();
    cartitems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;

        alreadtInCart = true;
      }
    });
    if (!alreadtInCart) {
      cartitems.push({
        ...product,
        count: 1,
      });
    }
    this.setState({
      cartitems,
    });
    localStorage.setItem("cartitem", JSON.stringify(cartitems));
  };
  cretaeOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartitems={this.state.cartitems}
                  removeFromCart={this.removeFromCart}
                  cretaeOrder={this.cretaeOrder}
                />
              </div>
            </div>
          </main>
          <footer>All right is reserved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
