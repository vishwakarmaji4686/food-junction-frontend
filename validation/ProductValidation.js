const joi = require("joi")
class ProductValidation {
    constructor() { }
    createProduct(req, res){
        let response = {
            isValid: true,
            message: null
        }
        let product = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            quantity: joi.number().required(),
            description: joi.string().required(),
            categoryId: joi.number().required()
        })
        let validationRes = product.validate(req.body);
        if (validationRes && validationRes.error && validationRes.error.details) {
            response.isValid = false;
            response.message = validationRes.error.details[0].message
        }
        return response;
    }
    productsValidation(req, res) {
        let response = {
            isValid: true,
            message: null
        }
        let product = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            quantity: joi.number().required(),
            description: joi.string().required(),
            categoryId: joi.number().required()
        })
        let validationRes = product.validate(req.body);
        if (validationRes && validationRes.error && validationRes.error.details) {
            response.isValid = false;
            response.message = validationRes.error.details[0].message
        }
        return response;
    }

}
module.exports = new ProductValidation();