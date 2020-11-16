//feature-12
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartitems: [],
    };
  }

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort(
        (a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1 //sort by newest
      ),
    }));
  };
  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({ products: data.products, size: e.target.value });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  removeFromCart = (product) => {
    console.log("product", product._id);

    const cartitems = this.state.cartitems.slice();
    this.setState({
      cartitems: cartitems.filter((item) => item._id !== product._id),
    });
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
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                counter={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartitems={this.state.cartitems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
