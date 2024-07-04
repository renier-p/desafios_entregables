import ProductService from "../services/productService.js";
const productService = new ProductService();

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("cliente conectado con ID:", socket.id);
        const listadeproductos = await productService.getProducts({}, { lean: true });
        socketServer.emit("enviodeproducts", listadeproductos);

        socket.on("addProduct", async (obj) => {
            await productService.addProduct(obj);
            const listadeproductos = await productService.getProducts({}, { lean: true });
            socketServer.emit("enviodeproducts", listadeproductos);
        });

        socket.on("deleteProduct", async (id) => {
            console.log(id);
            await productService.deleteProduct(id);
            const listadeproductos = await productService.getProducts({}, { lean: true });
            socketServer.emit("enviodeproducts", listadeproductos);
        });

        socket.on("nuevousuario", (usuario) => {
            console.log("usuario", usuario);
            socket.broadcast.emit("broadcast", usuario);
        });

        socket.on("disconnect", () => {
            console.log(`Usuario: ${socket.id} esta desconectado`);
        });
    });
};

export default socketProducts;
