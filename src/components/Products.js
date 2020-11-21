import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Flash from "react-reveal/Flash";
import Modal from "react-modal";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  openModel = (product) => {
    this.setState({ product });
  };
  closeModel = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => this.openModel(product)}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>

                  <div className="product-price">
                    <div className="price">{formatCurrency(product.price)}</div>
                    <button
                      className="button button-primary"
                      onClick={() => this.props.addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModel}>
            <Zoom>
              <button className="close-model" onClick={this.closeModel}>
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-des">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available sizes:{" "}
                    {product.availableSizes.map((item) => (
                      <span>
                        <button className="button">{item}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>
                      {formatCurrency(product.price)}
                      <button
                        className="button-primary"
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModel();
                        }}
                      >
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default Products;
