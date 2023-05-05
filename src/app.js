import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.json());
const pm = new ProductManager("./files/products.json");

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await pm.getProducts(limit);
    res.status(200);
    res.send(products);
    return;
  } catch (error) {
    res.status(500);
    res.send(error);
  }
  return;
});

app.get("/products/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product = await pm.getProductById(productId);
  if (!product) {
    res.status(404).json({ error: "Product doesn't exist" });
    return;
  } else {
    res.json({ product });
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080. Ready to receive requests");
});
