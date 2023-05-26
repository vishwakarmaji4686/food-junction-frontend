const joi = require("joi");
class UserValidation {
    constructor() { }
    UserValidat(req, res){
        const response = {
            isValid : true,
            message : null
        }
        let user = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().required(),
            contact: joi.number().required(),
            password: joi.string().required()
        });
        let validateRes = user.validate(req.body);
        console.log("validateRes", validateRes);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false,
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }
}
module.exports = new UserValidation()