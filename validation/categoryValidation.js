const Joi = require("joi");

class categoryValidation{
    constructor(){}
    async updateCategory(req, res) {
        let response = {
            isValid: true,
            message: null
        }
        let category = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        })
        let validationRes = category.validate(req.body);
        if (validationRes && validationRes.error && validationRes.error.details) {
            response.isValid = false;
            response.message = validationRes.error.details[0].message
        }
        console.log("response", response);
        return response;
    }
    async validation(req, res){
        let response = {
            isValid: true,
            message: null
        }
        let category = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            parentId: Joi.number().required(),
        })
        let validationRes = category.validate(req.body);
        if(validationRes && validationRes.error && validationRes.error.details){
            response.isValid =  false,
            response.message = validationRes.error.message[0].message
        }
        return response;
    }
}
module.exports = new categoryValidation();