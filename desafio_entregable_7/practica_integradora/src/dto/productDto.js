export default class ProductDto {
    constructor({ title, description, price, stock, thumbnail, code, category, status }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.thumbnail = thumbnail;
        this.code = code;
        this.category = category;
        this.status = status;
    }
}
