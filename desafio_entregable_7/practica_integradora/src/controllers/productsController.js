import ProductService from "../services/productService.js";

const productService = new ProductService();

export const getProducts = async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query, availability } = req.query;
        const options = { page: Number(page), limit: Number(limit), lean: true };
        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        let filter = {};
        if (query) {
            filter.category = query;
        }
        if (availability) {
            filter.status = availability === 'available' ? true : false;
        }

        const products = await productService.getProducts(filter, options);
        res.status(200).json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        res.status(200).json({ status: "success", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const productDto = new ProductDto(req.body);
        const newProduct = await productService.addProduct(productDto);
        res.status(201).json({ status: "success", newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productDto = new ProductDto(req.body);
        const updatedProduct = await productService.updateProduct(req.params.pid, productDto);
        res.status(200).json({ status: "success", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.pid);
        res.status(200).json({ status: "success", deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};
