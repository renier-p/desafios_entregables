// import CartService from '../services/cartService.js';

// const cartService = new CartService();

// const getCarts = async (req, res) => {
//     try {
//         const carts = await cartService.getCarts();
//         res.status(200).json(carts);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const getCartById = async (req, res) => {
//     try {
//         const cart = await cartService.getCartById(req.params.cid);
//         if (cart) {
//             res.status(200).json(cart);
//         } else {
//             res.status(404).json({ message: 'Carrito no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const addCart = async (req, res) => {
//     try {
//         const cart = await cartService.addCart([]);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const addProductToCart = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const cart = await cartService.addProductToCart(req.params.cid, productId, quantity);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const deleteProductInCart = async (req, res) => {
//     try {
//         const cart = await cartService.deleteProductInCart(req.params.cid, req.params.pid);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const updateCart = async (req, res) => {
//     try {
//         const cart = await cartService.updateCart(req.params.cid, req.body.products);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const updateOneProduct = async (req, res) => {
//     try {
//         const cart = await cartService.updateOneProduct(req.params.cid, req.body.product);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const deleteAllProductsInCart = async (req, res) => {
//     try {
//         const cart = await cartService.deleteAllProductsInCart(req.params.cid);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// export default {
//     getCarts,
//     getCartById,
//     addCart,
//     addProductToCart,
//     deleteProductInCart,
//     updateCart,
//     updateOneProduct,
//     deleteAllProductsInCart
// };


//- -- - -- - -- - - - - -- - - -

// import CartService from '../services/cartService.js';

// const cartService = new CartService();

// const getCarts = async (req, res) => {
//     try {
//         const carts = await cartService.getCarts();
//         res.status(200).json(carts);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const getCartById = async (req, res) => {
//     try {
//         const cart = await cartService.getCartById(req.params.cid);
//         if (cart) {
//             res.status(200).json(cart);
//         } else {
//             res.status(404).json({ message: 'Carrito no encontrado' });
//         }
//     } catch (error) {
//         res.status (500).json({ message: 'Error del servidor' });
//     }
// };

// // Nuevo método para renderizar la vista del carrito
// const renderCart = async (req, res) => {
//     try {
//         const cart = await cartService.getCartById(req.params.cid);
//         if (cart) {
//             res.render('cart', { cart, user: req.session.user });
//         } else {
//             res.status(404).render('notFound', { pageNotFound: '/cart' });
//         }
//     } catch (error) {
//         res.status(500).render('error', { message: 'Error del servidor' });
//     }
// };

// const addCart = async (req, res) => {
//     try {
//         const cart = await cartService.addCart([]);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const addProductToCart = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const cart = await cartService.addProductToCart(req.params.cid, productId, quantity);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const deleteProductInCart = async (req, res) => {
//     try {
//         const cart = await cartService.deleteProductInCart(req.params.cid, req.params.pid);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const updateCart = async (req, res) => {
//     try {
//         const cart = await cartService.updateCart(req.params.cid, req.body.products);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const updateOneProduct = async (req, res) => {
//     try {
//         const cart = await cartService.updateOneProduct(req.params.cid, req.body.product);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// const deleteAllProductsInCart = async (req, res) => {
//     try {
//         const cart = await cartService.deleteAllProductsInCart(req.params.cid);
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: 'Error del servidor' });
//     }
// };

// export default {
//     getCarts,
//     getCartById,
//     renderCart, // Exportar el nuevo método
//     addCart,
//     addProductToCart,
//     deleteProductInCart,
//     updateCart,
//     updateOneProduct,
//     deleteAllProductsInCart
// };

import CartService from '../services/cartService.js';

const cartService = new CartService();

const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getCartById = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Nuevo método para renderizar la vista del carrito
const renderCart = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        if (cart) {
            res.render('cart', { cart, user: req.session.user });
        } else {
            res.status(404).render('notFound', { pageNotFound: '/cart' });
        }
    } catch (error) {
        res.status(500).render('error', { message: 'Error del servidor' });
    }
};

const addCart = async (req, res) => {
    try {
        const cart = await cartService.addCart([]);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addProductToCart(req.params.cid, productId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const deleteProductInCart = async (req, res) => {
    try {
        const cart = await cartService.deleteProductInCart(req.params.cid, req.params.pid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updateCart = async (req, res) => {
    try {
        const cart = await cartService.updateCart(req.params.cid, req.body.products);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const updateOneProduct = async (req, res) => {
    try {
        const cart = await cartService.updateOneProduct(req.params.cid, req.body.product);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const deleteAllProductsInCart = async (req, res) => {
    try {
        const cart = await cartService.deleteAllProductsInCart(req.params.cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export default {
    getCarts,
    getCartById,
    renderCart, // Exportar el nuevo método
    addCart,
    addProductToCart,
    deleteProductInCart,
    updateCart,
    updateOneProduct,
    deleteAllProductsInCart
};

