import cartModel from '../models/carts.model.js';

export default class CartDao {
    async getCarts() {
        try {
            return await cartModel.find().populate('products.product').lean();
        } catch (err) {
            console.error('Error obteniendo los carritos:', err.message);
            return [];
        }
    }

    async getCartById(id) {
        try {
            return await cartModel.findById(id).populate('products').lean();
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return null;
        }
    }

    async addCart(products) {
        try {
            const existingCart = await cartModel.findOne().lean();
            if (existingCart) {
                return existingCart;
            }
            return await cartModel.create({ products });
        } catch (err) {
            console.error('Error creando el carrito:', err.message);
            return null;
        }
    }

    async addProductToCart(cid, product, quantity) {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { $addToSet: { products: { product, quantity } } },
                { new: true }
            ).populate('products.product');
        } catch (err) {
            console.error('Error agregando el producto al carrito:', err.message);
            return null;
        }
    }

    async deleteProductInCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                return null;
            }

            cart.products = cart.products.filter(item => item.product.toString() !== pid);

            await cart.save();
            return cart;
        } catch (err) {
            console.error('Error eliminando el producto del carrito:', err.message);
            return null;
        }
    }

    async updateCart(cartId, products) {
        try {
            return await cartModel.findByIdAndUpdate(cartId, { products }, { new: true });
        } catch (err) {
            console.error('Error actualizando el carrito:', err.message);
            return null;
        }
    }

    async updateOneProduct(cid, product) {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid, "products._id": product._id },
                { $set: { "products.$.quantity": product.quantity } },
                { new: true }
            );
        } catch (err) {
            console.error('Error actualizando la cantidad de producto en el carrito:', err.message);
            return null;
        }
    }

    async deleteAllProductsInCart(cid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                return null;
            }

            cart.products = [];

            await cart.save();
            return cart;
        } catch (err) {
            console.error('Error eliminando los productos del carrito:', err.message);
            return null;
        }
    }
}
