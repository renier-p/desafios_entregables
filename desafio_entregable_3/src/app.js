const ProductManager = require("./product_manager.js");
const express = require("express");
const manager = new ProductManager("./products.json");

const app = express();

const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const arrayProducts = await manager.readProducts();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const arraylimit = arrayProducts.slice(0, limit);
      return res.send(arraylimit);
    } else {
      return res.send(arrayProducts);
    }
  } catch (error) {
    console.log(error);
    return res.send("Error al procesar el pedido");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);
    const sought = await manager.getProductById(pid);
    if (pid) {
      return res.send(sought);
    } else {
      console.log("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    return res.send("Error al procesar el pedido de buscar x ID");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
