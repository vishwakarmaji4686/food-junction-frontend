const Joi = require("joi");

class categoryServices {
    constructor() { }
    updateCategory(req, res){
        let category = {
            title: req.body.title,
            description: req.body.description
        }
        return category;
    }
    createCategory(req, res){
        let category = {
            title: req.body.title,
            description: req.body.description,
            parentId: req.body.parentId,
        }
        return category;
    }
    
}
module.exports = new categoryServices();