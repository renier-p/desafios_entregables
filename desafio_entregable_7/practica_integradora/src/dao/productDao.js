import productsModel from "../models/products.model.js";

export default class ProductDao {
    async getAll(filter = {}, options = {}) {
        const { page = 1, limit = 3, sort, lean = true } = options;
        const queryOptions = { page, limit, sort, lean };
        return await productsModel.paginate(filter, queryOptions);
    }

    async getById(id) {
        return await productsModel.findById(id).lean();
    }

    async create(product) {
        await productsModel.create(product);
        return await productsModel.findOne({ title: product.title }).lean();
    }

    async update(id, product) {
        return await productsModel.findByIdAndUpdate(id, { $set: product }, { new: true }).lean();
    }

    async delete(id) {
        return await productsModel.findByIdAndDelete(id).lean();
    }

    async getCategories() {
        const categories = await productsModel.aggregate([
            {
                $group: {
                    _id: null,
                    categories: { $addToSet: "$category" }
                }
            }
        ]);
        return categories.length > 0 && categories[0].categories ? categories[0].categories : [];
    }
}
