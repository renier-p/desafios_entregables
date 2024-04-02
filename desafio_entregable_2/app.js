const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = "productos.json";
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

  //   saveProducts() {
  //     const data = JSON.stringify(this.products, null, 2);
  //     try {
  //       fs.writeFileSync(this.filePath, data);
  //       console.log("Producto agregado exitosamente.");
  //     } catch (error) {
  //       console.log("Error al agregar el producto.", error);
  //     }
  //   }

  //   loadProducts() {
  //     try {
  //       const data = fs.readFileSync(this.filePath, "utf8");
  //       this.products = JSON.parse(data);
  //       console.log("Productos: ", data);
  //     } catch (error) {
  //       this.products = [];
  //       console.log("Error al cargar los productos", error);
  //     }
  //   }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    try {
      await fs.writeFile(this.filePath, data); // Escribir de manera asíncrona
      console.log(
        "Productos guardados correctamente en el archivo:",
        this.filePath
      );
    } catch (error) {
      console.log(
        "Error al guardar los productos en el archivo:",
        this.filePath,
        error
      );
    }
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      this.products = JSON.parse(data);
      console.log(
        "Productos cargados correctamente desde el archivo:",
        this.filePath
      );
    } catch (error) {
      this.products = [];
      console.log(
        "Error al cargar los productos desde el archivo:",
        this.filePath,
        error
      );
    }
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

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;

// async agregarProducto(producto) {
//     try {
//       let productos = await this.leerProductos();
//       productos.push(producto);
//       await fs.writeFile(
//         this.productosFile,
//         JSON.stringify(productos, null, 2)
//       );
//     } catch (error) {
//       console.log("Error al agregar el producto", error);
//     }
//   }

//   async consultarProducto() {
//     try {
//       return await this.leerProductos();
//     } catch (error) {
//       console.log("Error al consultar productos", error);
//       return [];
//     }
//   }

//   async leerProductos() {
//     try {
//       const data = await fs.readFile(this.productosFile, "utf8");
//       return JSON.parse(data);
//     } catch (error) {
//       if (error.code === "ENOENT") {
//         return [];
//       } else {
//         throw error;
//       }
//     }
//   }
