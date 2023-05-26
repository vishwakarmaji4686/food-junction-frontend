const axios = require("axios");
const ProductServices = require("../../Services/ProductServices")
const productsValidation = require("../../validation/ProductValidation")

class ProductController {
    constructor() { }

    async product(req, res) {
        let page = {
            title: "product",
            pageName: "product",
            products: []
        };
        let endpoint = "http://localhost:3001/admin/product";
        let productsRes = await axios.get(endpoint);
        if (productsRes.status && productsRes.status == 200) {
            page.products = productsRes.data;
        }
        res.render("admin/template", page)
    }

    async addproduct(req, res) {
        try {
            let page = {
                title: "add-product",
                pageName: "add-product",
                categories: "",
                message: ""
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
        } catch (error) {
            console.log("addProduct error", error)
        }
    }

    async editProduct(req, res) {
        let page = {
            title: "edit-product",
            pageName: "edit-product",
            product: "",
            message: "",
            categories: []
        }

        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        let productId = req.query.productId
        let endpoint = "http://localhost:3001/admin/product/" + productId
        let productsRes = await axios.get(endpoint);
        if (productsRes.status && productsRes.status == 200) {
            page.product = productsRes.data;
        }
        let catEndpoint = "http://localhost:3001/admin/category";
        const catRes = await axios.get(catEndpoint);
        if (catRes && catRes.status && catRes.status == 200) {
            page.categories = catRes.data;
        }
        res.render("admin/template", page)
    }

    async updateProduct(req, res) {
        try {
            let productId = req.query.productId
            let productsvalidation = productsValidation.productsValidation(req, res)
            if (productsValidation && !productsvalidation.isValid) {
                req.session.message = productsvalidation.message
                res.redirect("/admin/edit-Product?productId=" + productId)
            }
            let product = ProductServices.updateProduct(req, res)
            console.log("product", product);
            let endpoint = "http://localhost:3001/admin/product/" + productId
            await axios.put(endpoint, product);
        } catch (error) {
            console.log("controller : updateProduc - ERROR", error);
            console.log("error.status", error.response.status);
            if (error && error.response && error.response.status && error.response.status == 422) {
                let productId = req.query.productId;
                let errorRes = error.response.data;
                console.log("errorRes", errorRes);
                req.session.message = errorRes.message;
                res.redirect('/admin/edit-product?productId=' + productId);
            }
            // if(error && error.status)
        }
    }
    async createProduct(req, res) {
        try {
            let productsvalidation = productsValidation.createProduct(req, res)
            if (productsvalidation && !productsvalidation.isValid) {
                req.session.message = productsvalidation.message
                res.redirect("/admin/add-product")
            }
            let productdata = ProductServices.createProduct(req, res)
            const exndpoint = "http://localhost:3001/admin/product"
            // res.redirect('/admin/product');

            let productImage = req.files.productImage
            console.log("productImage", productImage);
            var form = new FormData();

            // form.append("file",  productImage, productImage.name);
            form.append("filename",  req.files.productImage);

            form.append('title', req.body.title);
            form.append('description', req.body.description);
            form.append('price', req.body.price);
            form.append('quantity', req.body.quantity);
            form.append('categoryId', req.body.categoryId);
            // form.append(productdata);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            await axios.post(exndpoint, form, config);
            // await axios.post(exndpoint, productdata)
        } catch (error) {
            console.log("createProduct error ::", error);
        }
    }
    async deleteProduct(req, res) {
        let productId = req.query.productId;
        let endpoint = "http://localhost:3001/admin/product/" + productId
        res.redirect("/admin/category")
        axios.delete(endpoint);
    }
}
module.exports = new ProductController();