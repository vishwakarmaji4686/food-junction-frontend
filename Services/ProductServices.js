class ProductServices {
    constructor() { }
    createProduct(req, res) {
        let product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId
        }
        return product;
    }

    updateProduct(req, res) {
        let product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId
        }
        return product;
    }
}
module.exports = new ProductServices();