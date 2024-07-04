import ProductDao from "../dao/productDao.js";

export default class ProductService {
    constructor() {
        this.productDao = new ProductDao();
    }

    async getProducts(filter, options) {
        return await this.productDao.getAll(filter, options);
    }

    async getProductById(id) {
        return await this.productDao.getById(id);
    }

    async addProduct(product) {
        return await this.productDao.create(product);
    }

    async updateProduct(id, product) {
        return await this.productDao.update(id, product);
    }

    async deleteProduct(id) {
        return await this.productDao.delete(id);
    }

    async getCategories() {
        return await this.productDao.getCategories();
    }
}
