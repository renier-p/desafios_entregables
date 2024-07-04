class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Debe llenar todos los campos");
      return;
    }

    if (this.products.some((p) => p.code === product.code)) {
      console.log("El código ingresado ya está en uso");
      return;
    }

    const productId = this.products.length + 1;
    const newProduct = { ...product, id: productId };

    this.products.push(newProduct);
    console.log("El producto ha sido agregado correctamente");
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: el producto no existe");
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Polera",
  description: "Polera Red Hot Chili Peppers",
  price: 5.99,
  thumbnail: "imagenes/poleras/polera_rhcp",
  code: "2121",
  stock: "10",
});
productManager.addProduct({
  title: "Llavero",
  description: "Llavero Red Hot Chili Peppers",
  price: 1.99,
  thumbnail: "imagenes/llavero/llavero_rhcp",
  code: "3029",
  stock: "10",
});
productManager.addProduct({
  title: "Taza",
  description: "Taza Red Hot Chili Peppers",
  price: 1.99,
  thumbnail: "imagenes/taza/taza_rhcp",
  code: "3030",
  stock: "10",
});
productManager.addProduct({
  title: "Polera",
  description: "Polera Limp Bizkit",
  price: 1.99,
  thumbnail: "imagenes/polera/polera_lb",
  code: "3031",
  stock: "10",
});

const productos = productManager.getProducts();
const producto = productManager.getProductsById(3);
console.log(productos);
console.log(producto);
