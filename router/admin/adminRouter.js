const express = require("express")
const app = express()
const productController = require("../../controller/admin/ProductController")
const CategoryController = require("../../controller/admin/CategoryController")
const UserController = require("../../controller/admin/UserController")

app.get("/home", function(req, res){
    let page = {
        title : "home",
        pageName: "home"
    }
    res.render("admin/template", page)
});
app.get("/product", productController.product);
app.get("/add-product", productController.addproduct);
app.post("/create-product", productController.createProduct)
app.get("/edit-product", productController.editProduct);
app.post("/updateProduct", productController.updateProduct);
app.get("/deleteProduct", productController.deleteProduct)

app.get("/Category", CategoryController.category);
app.get("/add-category", CategoryController.addcategory);
app.post("/createCategory", CategoryController.createCategory)
app.get("/edit-category", CategoryController.editcategory);
app.post("/updateCategory", CategoryController.updateCategory);
app.get("/deleteCategory", CategoryController.deleteCategory);

app.get("/addUser", UserController.createUser)
app.post("/create-User", UserController.insertUser)


app.get("/", function(req, res){
    let page = {
        title : "login",
        pageName: "login"
    }
    res.render("admin/login", page)
});
app.get("/all-user", UserController.allUser);
module.exports = app;