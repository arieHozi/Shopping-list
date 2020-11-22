const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortid = require("shortid");

const app = express();

//add middleware
app.use(bodyParser.json());

//init mongoose

// mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// mongodb connection//
const db = require("./config/Keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log(err.message));

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: {
      type: String,
      default: shortid.generate,
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const saveProduct = await newProduct.save();
  res.send(saveProduct);
});
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findOneAndDelete(req.params.id);
  res.send(deletedProduct);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is runing on port ${port}`));
