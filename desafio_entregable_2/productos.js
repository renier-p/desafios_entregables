const ProductManager = require("./app");

const product = new ProductManager();

product.addProduct({
  title: "Camisa",
  description: "Camisa de Red Hot Chili Peppers",
  price: 2000,
  thumbnail: "img/camisa/camisa_rhcp.jpg",
  code: "c001",
  stock: 10,
});
product.addProduct({
  title: "Llavero",
  description: "Llavero de Red Hot Chili Peppers",
  price: 1000,
  thumbnail: "img/llavero/llavero_rhcp.jpg",
  code: "l001",
  stock: 10,
});

// product
//   .getProducts()
//   .then((product) => console.log(("Productos", product)))
//   .catch((error) => console.error("Error al consultar productos", error));

// product.saveProducts();
// console.log(product.getProducts());

product.updateProduct(1, { stock: 8 });
console.log(product.getProducts());

// product.deleteProduct(1);
// console.log(product.getProducts());
