import CartDao from '../dao/cartDao.js';
import CartDto from '../dto/cartDto.js';

export default class CartService {
    constructor() {
        this.cartDao = new CartDao();
    }

    async getCarts() {
        const carts = await this.cartDao.getCarts();
        return carts.map(cart => new CartDto(cart));
    }

    async getCartById(id) {
        const cart = await this.cartDao.getCartById(id);
        if (cart) {
            return new CartDto(cart);
        }
        return null;
    }

    async addCart(products) {
        const cart = await this.cartDao.addCart(products);
        return new CartDto(cart);
    }

    async addProductToCart(cid, product, quantity) {
        const cart = await this.cartDao.addProductToCart(cid, product, quantity);
        return new CartDto(cart);
    }

    async deleteProductInCart(cid, pid) {
        const cart = await this.cartDao.deleteProductInCart(cid, pid);
        return new CartDto(cart);
    }

    async updateCart(cartId, products) {
        const cart = await this.cartDao.updateCart(cartId, products);
        return new CartDto(cart);
    }

    async updateOneProduct(cid, product) {
        const cart = await this.cartDao.updateOneProduct(cid, product);
        return new CartDto(cart);
    }

    async deleteAllProductsInCart(cid) {
        const cart = await this.cartDao.deleteAllProductsInCart(cid);
        return new CartDto(cart);
    }
}
