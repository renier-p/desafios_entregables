export default class CartDto {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(product => ({
            productId: product.product._id,
            quantity: product.quantity,
            name: product.product.name,
            price: product.product.price,
        }));
    }
}
