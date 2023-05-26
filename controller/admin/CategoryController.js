const axios = require("axios");
const categoryServices = require("../../Services/categoryServices")
const categoryValidation = require("../../validation/categoryValidation");

class CategoryController {
    constructor() { }
    async category(req, res) {
        let page = {
            title: "Category",
            pageName: "Category",
            category: []
        }
        const endpoint = "http://localhost:3001/admin/category";
        const categoryRes = await axios.get(endpoint);
        if (categoryRes.status && categoryRes.status == 200) {
            page.category = categoryRes.data;
        }
        res.render("admin/template", page)
    }
    async addcategory(req, res) {
        let page = {
            title: "add-category",
            pageName: "add-category",
            message: "",
            categories: ""
        }
        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        let catEndpoint = "http://localhost:3001/admin/category";
        const catRes = await axios.get(catEndpoint);
        if (catRes && catRes.status && catRes.status == 200) {
            page.categories = catRes.data;
        }
        res.render("admin/template", page)
    }
    async editcategory(req, res) {
        let page = {
            title: "edit-category",
            pageName: "edit-category",
            category: "",
            message: ""
        }

        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        let categoryId = req.query.categoryId
        let endpoint = "http://localhost:3001/admin/category/" + categoryId
        let categoryRes = await axios.get(endpoint)
        if (categoryRes.status && categoryRes.status == 200) {
            page.category = categoryRes.data
        }
        res.render("admin/template", page)
    }
    async updateCategory(req, res) {
        let categoryId = req.query
        let categoryValidate = await categoryValidation.updateCategory(req, res)
        if (categoryValidate && !categoryValidate.isValid) {
            req.session.message = categoryValidate.message
            res.redirect("/admin/edit-category?categoryId=") + categoryId
        }
        let category = categoryServices.updateCategory(req, res)
        let endpoint = "http://localhost:3001/admin/category/" + categoryId
        await axios.post(endpoint, category);
    }
    async createCategory(req, res) {
        let validation = categoryValidation.validation(req, res)
        if (validation && validation.isValid) {
            req.session.message = await validation.message;
            res.redirect("/admin/add-category")
        }
        let category = categoryServices.createCategory(req, res);
        let endpoint = "http://localhost:3001/admin/category"
        axios.post(endpoint, category);
    }
    async deleteCategory(req, res) {
        let categoryId = req.query.categoryId
        console.log("categoryId", categoryId);
        let endpoint = "http://localhost:3001/admin/category/"+categoryId;
        axios.delete(endpoint)
        res.redirect("/admin/category")
    }
}
module.exports = new CategoryController();