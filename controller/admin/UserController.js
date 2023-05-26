const UserValidation = require("../../validation/UserValidation");
const UserServices = require("../../Services/UserServices");
const axios = require("axios");
class UserController {
    constructor() { }
    createUser(req, res) {
        let page = {
            title: "addUser",
            pageName: "addUser",
            message: ""
        };
        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message;
        }
        res.render("admin/template", page)
    }
    async insertUser(req, res) {
        let validation = UserValidation.UserValidat(req, res);
        if (validation && !validation.isValid) {
            req.session.message = validation.message
            res.redirect("/admin/addUser")
        }
        let user = await UserServices.inserUser(req, res)
        let endpoint = "http://localhost:3001/admin/user";
        await axios.post(endpoint, user)
        res.redirect("/admin/all-user")
    }
    async allUser(req, res) {
        let page = {
            title: "all-user",
            pageName: "all-user"
        }
       /*  let endpoint = "http://localhost:3001/admin/user";
        let user = await axios.get(endpoint, */
        res.render("admin/template", page)
    }
}
module.exports = new UserController();