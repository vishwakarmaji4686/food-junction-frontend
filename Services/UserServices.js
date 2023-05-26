class UserServices{
    constructor(){}
    async inserUser(req, res){
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password,
        }
        return user;
    }
}
module.exports = new UserServices();